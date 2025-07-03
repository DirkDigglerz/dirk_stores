local paymentMethods = require 'settings.paymentMethods'

function Store:ensureNearby(src)
  if not self.locations or #self.locations == 0 then 
    return true -- No locations defined, so no need to check proximity
  end

  local playerPos = GetEntityCoords(GetPlayerPed(src))
  local foundNearby = false
  for _, location in pairs(self.locations) do
    local distance = #(playerPos - location.xyz)
    if distance < 5.0 then
      foundNearby = true
      break
    end
  end

  if not foundNearby then 
    return false, 'NotNearStore'
  end
  return true
end


function Store:canAccessStore(src)

  if not self:ensureNearby(src) then 
    return false, 'NotNearStore'
  end

  -- if not hasGroup(src, self.groups) then
  --   return false, 'StoreAccessDeniedGroup'
  -- end

  -- if not hasLicense(src, self.licenses) then 
  --   return false, 'StoreAccessDeniedLicense'
  -- end 

  if self.canOpen then 
    local success, reason = self.canOpen(src)
    if not success then
      return false, reason or 'CannotOpenCustom'
    end 
  end 

  return true
end


function Store:openStore(src)
  local canAccess, _error = self:canAccessStore(src)
  if not canAccess then
    return false, _error
  end

  self.usingStore[src] = true
  local stock = {}
  for k,v in ipairs(self.stock) do
    local itemData = {
      id          = v.id,
      name        = v.name,
      price       = v.price,
      icon        = v.icon,
      category    = v.category,
      label       = v.label,
      description = v.description,
      license     = v.license,
      stock       = self.type == 'sell' and (lib.inventory.hasItem(src, v.name) or 0) or v.stock,
    }

    if self.type == 'sell' then 
      local hasItem = lib.inventory.hasItem(src, v.name)
      if hasItem and hasItem > 0 then 
        itemData.stock = hasItem
      else 
        itemData.disabled = {
          icon = 'fas fa-ban',
          message = locale('DontHaveItem')
        }
      end
    else 
      if v.stock and v.stock <= 0 then 
        itemData.disabled = {
          icon = 'fas fa-ban',
          message = locale('OutOfStock')
        }
      end 
    end 
    table.insert(stock, itemData)
  end
  return true, stock
end


lib.callback.register('dirk_stores:openStore', function(src, storeId)
  local store = Store.get(storeId)
  if not store then return false, 'StoreNotFound' end
  return store:openStore(src)
end)

function Store:closedStore(src)
  self.usingStore[src] = nil
end

RegisterNetEvent('dirk_stores:closeStore', function(storeId)
  local store = Store.get(storeId)
  if not store then return end
  store:closedStore(source)
end)




