local Stores = {}
Store = {}
Store.__index = Store



function Store:__init()
  self:sanitizePaymentMethods()
  self:spawnBlip()
  self:spawnPed()
  return true 
end

Store.getAll = function()
  return Stores
end

Store.register = function(data)
  local self = setmetatable(data, Store)
  lib.print.info(('Registering store %s'):format(self.id))
  self.id = data.id
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
  store:destroyBlips()
  store:destroyPeds()
  Stores[id] = nil
end

RegisterNetEvent('dirk_stores:updateStore', function(id, data)
  local store = Stores[id]
  if not store and data then 
    return Store.register(data)
  elseif store and data then 
    -- Update existing store
    store.id = id
    for k, v in pairs(data) do
      store[k] = v
    end
  elseif store and not data then 
    -- Remove store
    Store.destroy(id)
  end 
end)

