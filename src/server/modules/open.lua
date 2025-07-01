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
    return false, 'not_near_store'
  end
  return true
end

function Store:openStore(src)
  local canOpen = self.canOpen and self.canOpen(src)
  if not canOpen then return false, 'cannot_open_custom' end
  if not self:ensureNearby(src) then 
    return false, 'not_near_store'
  end
  self.usingStore[src] = true
  local stock = {}
  for k,v in ipairs(self.stock) do
    local default_data = {
      id = v.id,
      name       = v.name,
      price      = v.price,
      icon       = v.icon,
      category   = v.category,
      label      = v.label,
      image      = v.image,
      description = v.description,
      stock      = self.type == 'sell' and (lib.inventory.hasItem(src, v.name) or 0) or v.stock,
    }

    if self.type == 'sell' then 
      local has_item = lib.inventory.hasItem(src, v.name)
      if has_item and has_item > 0 then 
        default_data.stock = has_item
      else 
        default_data.disableIcon = 'fas fa-ban'
        default_data.disableMessage = locale('dont_have_item')
      end
    else 
      if v.stock and v.stock <= 0 then 
        default_data.disableIcon = 'fas fa-ban'
        default_data.disableMessage = locale('out_of_stock')    
      end 
    end 
    table.insert(stock, default_data)
  end

  return true, stock
end


lib.callback.register('dirk_stores:openStore', function(src, store_id)
  local store = Store.get(store_id)
  if not store then return false, 'store_not_found' end
  return store:openStore(src)
end)

function Store:closedStore(src)
  self.usingStore[src] = nil
end

RegisterNetEvent('dirk_stores:closeStore', function(store_id)
  local store = Store.get(store_id)
  if not store then return end
  store:closedStore(source)
end)




