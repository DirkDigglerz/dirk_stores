local cfg = require 'settings.config'
RegisterNuiCallback('GET_SETTINGS', function(data, cb)
  cb({
    primaryColor  = lib.settings.primaryColor or 'clean', 
    primaryShade  = lib.settings.primaryShade, 
    customTheme   = lib.settings.customTheme,
    currency      = cfg.currency,
    item_img_path = lib.settings.item_img_path or 'nui://clean_inventory/web/images/',
  })
end)

openStore = function(store_id)
  local can_open, ui_data = lib.callback.await('clean_stores:openStore', store_id)
  print('Can open', can_open, json.encode(ui_data, {indent = true}))
  if not can_open then 
    return lib.print.debug(('Store %s cannot be opened reason: %s'):format(store_id, ui_data))
  end
  open_store_id = store_id
 
  SendNUIMessage({
    action = 'OPEN_STORE',
    data   = ui_data
  })
  TriggerScreenblurFadeIn(500)
  SetNuiFocus(true, true)
end

local closeStore = function()
  if not open_store_id then return end
  TriggerScreenblurFadeOut(500)
  SetNuiFocus(false, false)
  SendNUIMessage({
    action = 'CLOSE_STORE'
  })
  TriggerServerEvent('clean_stores:closeStore', open_store_id)
  open_store_id = nil
end

RegisterNuiCallback('MAKE_PAYMENT', function(data, cb)
  print('Making payment', json.encode(data, {indent = true}))
  local purchased, fail_reason = lib.callback.await('clean_stores:attemptPurchase', open_store_id, data.cart, data.method)
  print('Purchased', purchased, fail_reason)
  if purchased then 
    closeStore();
  end
  cb({purchased = purchased, fail_reason = fail_reason})
end)

RegisterNuiCallback('STORE_CLOSED', function(data, cb)
  closeStore()
end)

AddEventHandler('onResourceStop', function(resource)
  if resource == GetCurrentResourceName() then 
    TriggerScreenblurFadeOut(500)
  end
end)