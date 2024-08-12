function Shop:updateStock(new_stock)
  local past_sanitized = self:santizeItems()
  if not past_sanitized then return end
  self.stock = new_stock
end

exports('updateStock', function(shop_id, new_stock)
  local shop = Shop.get(shop_id)
  if not shop then return end
  shop:updateStock(new_stock)
end)  

function Shop:getItemByListingId(listing_id)
  for k,v in pairs(self.stock) do
    if v.listing_id == listing_id then
      return v
    end
  end
end

function Shop:updateStockByListingId(listing_id, amount)
  local item = self:getItemByListingId(listing_id)
  if not item then return end
  item.stock = item.stock + amount
end