local loadedFromCallback = {}
local paymentMethods = require 'settings.paymentMethods'
local Stores = {}

Store = {}
Store.__index = Store

function Store:generateListingId()
  local id = string.format('%s_%s', self.id, math.random(1000, 9999))
  Wait(0)
  for k,v in pairs(self.stock) do
    if v.id == id then
      return self:generateListingId()
    end
  end
  return id
end

local function getItemLabel(name)
  return name:gsub('_', ' '):gsub('(%l)(%w*)', function(a,b) return string.upper(a)..b end)
end

local function getItemImage(name)
  return string.format('%s%s.png', lib.settings.itemImgPath, name)
end

function Store:sanitizeItems()
  for k,v in ipairs(self.stock) do
    self.stock[k].id = self:generateListingId()
    assert(v.name, 'Item must have a name')
    assert(v.price, 'Item must have a price')
    assert(v.category, 'Item must have a category')
    self.stock[k].label = v.label or lib.inventory.getItemLabel(v.name) or getItemLabel(v.name)
    self.stock[k].image = v.image or getItemImage(v.name) 
    self.stock[k].description = v.description or ''
  end
  return true
end

function Store:__init()
  assert(self.name, 'Store must have a name')
  assert(self.description, 'Store must have a description')
  assert(self.icon, 'Store must have an icon')
  assert(self.paymentMethods, 'Store must have payment methods')
  for k,v in pairs(self.paymentMethods) do
    if not paymentMethods[v] then 
      lib.print.info(('Payment %s method does not exist in settings/paymentMethods'):format(v))
    end 
  end

  assert(self.categories and type(self.categories) == 'table', 'Store categories must exist and be an array of categories')
  for k,v in pairs(self.categories) do
    assert(v.name, 'Category must have a name')
    assert(v.icon, 'Category must have an icon')
    assert(v.description, 'Category must have a description')
  end

  assert(self.stock and type(self.stock) == 'table', 'Store items must exist and be an array of items')
  local passed_items = self:sanitizeItems()
  if not passed_items then return false end
  TriggerClientEvent('dirk_stores:updateStore', -1, self.id, self:getClientData())
  return true 
end

Store.register = function(data)
  local self = setmetatable(data, Store)
  self.resource = GetInvokingResource() or GetCurrentResourceName()
  self.usingStore = {}
  if not self:__init() then 
    lib.print.error(('Store %s failed to initialize.'):format(self.id))
    return nil
  end
  Stores[self.id] = self
  return self 
end

Store.destroy = function(id)
  local store = Stores[id]
  if not store then return end
  Stores[id] = nil
  TriggerClientEvent('dirk_stores:updateStore', -1, id, nil)
end

Store.get = function(id)
  return Stores[id]
end

AddEventHandler('onResourceStop', function(resource)
  for k,v in pairs(Stores) do
    if v.resource == resource then
      Store.destroy(k)
    end
  end
end)

AddEventHandler('playerDropped', function()
  local src = source
  for k,v in pairs(Stores) do
    v.usingStore[src] = nil
  end
end)

function Store:getClientData()
  return {
    id = self.id,
    type = self.type,
    name = self.name,
    categories = self.categories,
    description = self.description,
    icon = self.icon,
    models = self.models,
    locations = self.locations,
  }
end

Store.getAllClient = function()
  while not Store.loadedFromFile do 
    Wait(500)
  end
  local ret = {}
  for k,v in pairs(Stores) do
    table.insert(ret, v:getClientData())
  end
  return ret
end

lib.callback.register('dirk_stores:getStores', function(src)
  loadedFromCallback[src] = true
  return Store.getAllClient()
end)


--[[
  Server Sided Usage:   
]]

exports('getStore', Store.get)
exports('registerStore', Store.register)
exports('destroyStore', Store.destroy)
