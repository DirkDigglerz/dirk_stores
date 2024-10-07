CreateThread(function()
  for k,v in pairs(BaseStores) do 
    Store.register(k, v)
  end 
end)

-- exports['clean_stores']:register('store_test', {
--   name = 'Store Test',
--   description = 'This is a test store',
--   icon = 'user',
--   paymentMethods = {'cash', 'bank'},

--   categories = {
--     {name = 'Category 1', icon = 'user', description = 'Category 1 description'},
--   },

--   stock = {
--     {name = 'item_1', price = 100, label='Item 1', image = 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png', description = 'This is a drivers license I mean you could probably drive with it', category = 'Category 1', stock = 10},
--   },

--   --## Will run before the purchase is made so you could take away items from an inventory return false if theres an issue return true to proceed
--   canExchange = function(ply, basket, totalPrice)
--     return true
--   end,

--   onExcange = function(ply, items, totalPrice)
--     --## use this hook to make the money go somewhere after purchases e.g logs/directing cash to a person/inventory etc 
--   end,
-- })