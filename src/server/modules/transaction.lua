local paymentMethods = require 'settings.paymentMethods'
local metadataGenerators = require 'settings.metadataGenerators'


function Store:canAccessItem(src, item)


  if item.groups then 

  end 

  if item.licenses then 

  end 

  return true
end

function Store:attemptTransaction(src, cart, payment_method)
  local totalPrice = 0
  for k,v in pairs(cart) do
    local item = self:getItemByListingId(v.id)
    
    if not item then 
      return false, 'no_item_by_id'
    end

    if not self:canAccessItem(src, item) then
      return false, 'item_access_denied'
    end

    if item.stock and v.quantity > item.stock then
      return false, 'not_enough_stock'
    end

    if self.type == 'sell' and not lib.inventory.hasItem(src, item.name, v.quantity) then
      return false, 'not_enough_item'
    end

    totalPrice += item.price * v.quantity 
  end


  if self.canExchange then 
    local canExchange, reason = self.canExchange(src, cart, totalPrice)
    if not canExchange then
      return false, reason
    end
  end
  
  --## Payment method
  local paymentMethod = paymentMethods[payment_method]
  if not paymentMethod then
    return false, 'invalid_payment_method'
  end

  if self.type == 'sell' then 
    lib.print.info(('Attempting to sell %s items for %s'):format(#cart, totalPrice))
    --## Remove all items and add money
    for k,v in pairs(cart) do
      local item = self:getItemByListingId(v.id)
      if not lib.inventory.removeItem(src, item.name, v.quantity) then 
        return false, 'remove_item_failed'
      end
    end
    paymentMethod.add(src, totalPrice)
  elseif self.type == 'buy' then 
    local removed, reason = paymentMethod.remove(src, totalPrice)
    if not removed then
      return false, 'payment_failed_no_money'
    end
  end   



  for k,v in pairs(cart) do
    self:updateStockByListingId(v.id, -v.quantity)
  end

  if self.onTransaction then
    local allow, reason = self.onTransaction(src, cart, totalPrice)
    if not allow then
      return false, reason
    end 
  end

  for k,v in pairs(cart) do
    local item = self:getItemByListingId(v.id)
    if self.type == 'sell' then 
      lib.inventory.removeItem(src, item.name, v.quantity)
    else 
      local metadataGenerator = metadataGenerators[item.name]
      if metadataGenerator then 
        for i= 1, v.quantity do
          local metadata = metadataGenerator()
          if not metadata then
            lib.print.error(('Metadata generator for item %s returned nil'):format(item.name))
            return false, 'metadata_generation_failed'
          end
          lib.inventory.addItem(src, item.name, 1, metadata)
        end
      else 
        lib.inventory.addItem(src, item.name, v.quantity)
      end 
    end
  end

  lib.notify(src, {
    title = locale('transaction_complete'),
    description = locale('transaction_complete_message'),
    type = 'success',
  })

  return true
end

lib.callback.register('dirk_stores:attemptTransaction', function(src, store_id, cart, payment_method)
  local src = source
  local store = Store.get(store_id)
  if not store then return end
  if not store:canAccessStore(src) then
    lib.print.error(('Player %s attempted to access store %s without permission'):format(src, store_id))
    return false, locale('StoreAccessDenied')
  end
  return store:attemptTransaction(src, cart, payment_method)
end)