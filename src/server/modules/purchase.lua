local paymentMethods = require 'settings.paymentMethods'
local metadataGenerators = require 'settings.metadataGenerators'


function Store:attemptPurchase(src, cart, payment_method)
  local totalPrice = 0
  for k,v in pairs(cart) do
    local item = self:getItemByListingId(v.listing_id)
    
    if not item then 
      return false, 'no_item_by_id'
    end

    if item.stock and v.amount > item.stock then
      return false, 'not_enough_stock'
    end

    totalPrice += item.price * v.amount 
  end


  if self.canPurchase then 
    local canPurchase, reason = self.canPurchase(src, cart, totalPrice)
    if not canPurchase then
      return false, reason
    end
  end
  
  --## Payment method
  local paymentMethod = paymentMethods[payment_method]
  if not paymentMethod then
    return false, 'invalid_payment_method'
  end

  if not paymentMethod.remove(src, totalPrice) then
    return false, 'payment_failed_no_money'
  end

  for k,v in pairs(cart) do
    self:updateStockByListingId(v.listing_id, -v.amount)
  end

  if self.onPurchase then
    self.onPurchase(src, cart, totalPrice)
  end

  for k,v in pairs(cart) do
    local metadataGenerator = metadataGenerators[v.name]
    lib.player.addItem(src, v.name, v.amount, nil, metadataGenerator and metadataGenerator() or nil)
  end

  return true
end


lib.callback.register('clean_stores:attemptPurchase', function(src, store_id, cart, payment_method)
  print('Attempting purchase', src, store_id, json.encode(cart, {indent = true}), payment_method)
  local src = source
  local store = Store.get(store_id)
  if not store then return end
  return store:attemptPurchase(src, cart, payment_method)
end)