local Shops = {}

local Shop = {}
Shop.__index = Shop

function Shop:generateListingId()
  local id = string.format('%s_%s', self.id, math.random(1000, 9999))
  Wait(0)
  for k,v in pairs(self.stock) do
    if v.listing_id == id then
      return self:generateListingId()
    end
  end
  return id
end

local function getItemImage(name)
  return string.format('https://raw.githubusercontent.com/fazitanvir/items-images/main/%s.png', name)
end

function Shop:sanitizeItems()
  for k,v in pairs(self.stock) do
    self.listing_id = self:generateListingId()
    assert(v.name, 'Item must have a name')
    assert(v.price, 'Item must have a price')
    assert(v.category, 'Item must have a category')
    self.stock[k].label = v.label or getItemLabel(v.name)
    self.stock[k].image = v.image or getItemImage(v.name)
    self.stock[k].description = v.description or ''
  end
  return true
end

function Shop:__init()
  assert(self.name, 'Shop must have a name')
  assert(self.description, 'Shop must have a description')
  assert(self.icon, 'Shop must have an icon')
  assert(self.paymentMethods, 'Shop must have payment methods')
  for k,v in pairs(self.paymentMethods) do
    assert(Config.paymentMethods[v], 'Payment method does not exist in Config.paymentMethods')
  end

  assert(self.categories and type(self.categories) == 'table', 'Shop categories must exist and be an array of categories')
  for k,v in pairs(self.categories) do
    assert(v.name, 'Category must have a name')
    assert(v.icon, 'Category must have an icon')
    assert(v.description, 'Category must have a description')
  end

  assert(self.stock and type(self.stock) == 'table', 'Shop items must exist and be an array of items')
  local passed_items = self:santizeItems()
  if not passed_items then return false end

  return true 
end

Shop.register = function(id, data)
  local self = setmetatable(data, Shop)
  self.id = id
  self.resource = GetInvokingResource() or GetCurrentResourceName()
  if self:__init() then 
    Shops[id] = self
    return self
  else 
    return nil
  end
end

exports('registerShop', Shop.register)

Shop.destroy = function(id)
  local shop = Shops[id]
  if not shop then return end
  Shops[id] = nil
end

exports('destroyShop', Shop.destroy)

Shop.get = function(id)
  return Shops[id]
end

exports('getShop', Shop.get)

AddEventHandler('onResourceStop', function(resource)
  for k,v in pairs(Shops) do
    if v.resource == resource then
      Shops[k] = nil
    end
  end
end)

AddEventHandler('playerDropped', function()
  local src = source
  for k,v in pairs(Shops) do
    if v.usingStore = src then
      v.usingStore = nil
    end
  end
end)

--[[
  Server Sided Usage: 
]]

-- exports['clean_shops']:register('shop_test', {
--   name = 'Shop Test',
--   description = 'This is a test shop',
--   icon = 'user',
--   paymentMethods = {'cash', 'bank'},

--   categories = {
--     {name = 'Category 1', icon = 'user', description = 'Category 1 description'},
--   },

--   stock = {
--     {name = 'item_1', price = 100, label='Item 1', image = 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png', description = 'This is a drivers license I mean you could probably drive with it', category = 'Category 1', stock = 10},
--   },

--   --## Will run before the purchase is made so you could take away items from an inventory return false if theres an issue return true to proceed
--   canPurchase = function(ply, basket, totalPrice)
--     return true
--   end,

--   onPurchase = function(ply, items, totalPrice)
--     --## use this hook to make the money go somewhere after purchases e.g logs/directing cash to a person/inventory etc 
--   end,
-- })

-- exports['clean_shops']:openStore()