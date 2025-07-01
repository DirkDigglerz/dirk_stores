local basic = require 'settings.basic'
RegisterNuiCallback('GET_SETTINGS', function(data, cb)
  cb({
    game             = cache.game, 
    primaryColor     = lib.settings.primaryColor, 
    primaryShade     = lib.settings.primaryShade,
    itemImagePath    = lib.settings.itemImagePath,
    customTheme      = lib.settings.customTheme,
    background       = basic.background,
    currency         = basic.currency,
  })
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
