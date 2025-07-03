local basic = require 'settings.basic'

getTheme = function()
  return {
    primaryColor     = lib.settings.primaryColor, 
    primaryShade     = lib.settings.primaryShade,
    customTheme      = lib.settings.customTheme,
  }
end

RegisterNuiCallback('GET_SETTINGS', function(data, cb)
  local settings = {
    game             = 'rdr3', 
    itemImagePath    = lib.settings.itemImagePath,
    background       = basic.background,
    currency         = basic.currency,
  }
  for k,v in pairs(getTheme()) do
    settings[k] = v
  end
  cb(settings)
end)

RegisterNuiCallback('GET_LOCALES', function(data, cb)
  cb(lib.getLocales())
end)

AddEventHandler('onResourceStop', function(resource)
  if resource == GetCurrentResourceName() then 
    TriggerScreenblurFadeOut(500)
  end
end)

lib.onCache('playerLoaded', function(data)
  if not data then return end
  local stores = lib.callback.await('dirk_stores:getStores')
  for _, storeData in pairs(stores) do
    Store.register(storeData)
  end
end)
