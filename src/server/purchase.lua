

function Shop:attemptPurchase(src, cart, payment_method)
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
  local paymentMethod = Config.paymentMethods[payment_method]
  if not paymentMethod then
    return false, 'invalid_payment_method'
  end

  if not paymentMethod.has_money(src, totalPrice) then
    return false, 'payment_failed_no_money'
  end

  for k,v in pairs(cart) do
    self:updateStockByListingId(v.listing_id, -v.amount)
  end

  if self.onPurchase then
    self.onPurchase(src, cart, totalPrice)
  end

  return true
end


RegisterNetEvent('clean_shops:attemptPurchase', function(shop_id, cart, payment_method)
  local src = source
  local shop = Shop.get(shop_id)
  if not shop then return end
  shop:attemptPurchase(src, cart, payment_method)
end)