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

RegisterNuiCallback('GET_LOCALES', function(data, cb)
  cb(lib.getLocales())
end)

openStore = function(store_id)
  local can_open, ui_data = lib.callback.await('clean_stores:openStore', store_id)
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

RegisterNuiCallback('MAKE_TRANSACTION', function(data, cb)
  local transaction, fail_message = lib.callback.await('clean_stores:attemptTransaction', open_store_id, data.cart, data.method)
  lib.print.info(('Response from transaction: %s, %s'):format(transaction, fail_message))
  if transaction then 
    closeStore();
  end
  cb({transaction = transaction, fail_message = fail_message})
end)

RegisterNuiCallback('STORE_CLOSED', function(data, cb)
  closeStore()
end)

AddEventHandler('onResourceStop', function(resource)
  if resource == GetCurrentResourceName() then 
    TriggerScreenblurFadeOut(500)
  end
end)