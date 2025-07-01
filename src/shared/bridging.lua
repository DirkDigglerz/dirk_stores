
local basic = require'settings.basic'
if not basic.catchOxStores then return end
local exportHandler = function(exportName, func)
  AddEventHandler(('__cfx_export_ox_inventory_%s'):format(exportName), function(setCB)
    setCB(func)
  end)
end



if context == 'client' then 
  exportHandler('openInventory', function(invType, data)
    if invType ~= 'shop' then return end 
  
    ---@todo Open Store, also catch registration server side 
  
  end)
else 

end 
