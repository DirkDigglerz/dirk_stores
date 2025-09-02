
local basic = require'settings.basic'
if not basic.catchOxStores then return end
local exportHandler = function(exportName, func)
  AddEventHandler(('__cfx_export_ox_inventory_%s'):format(exportName), function(setCB)
    setCB(func)
  end)
end

if context == 'client' then 
  if lib.settings.inventory == 'dirk_inventory' then return false; end 
  exportHandler('openInventory', function(invType, data)
    if invType ~= 'shop' then return end 
    local shopId, shopIndex = data.type, data.id
    local store = Stores.get(shopId)
    if not store then return false; end 
    if data.id and not store.locations[tonumber(data.id)] then 
      print('Location index wrong?')
    end 
    store:open()
  end)
else 
  exportHandler('RegisterShop', function(shopId, data)
      -- name = 'Test shop',
      -- inventory = {
      --     { name = 'burger', price = 10 },
      --     { name = 'water', price = 10 },
      --     { name = 'cola', price = 10 },
      -- },
      -- locations = {
      --     vec3(223.832962, -792.619751, 30.695190),
      -- },
      -- groups = {
      --     police = 0
      -- },
  end)
end 
