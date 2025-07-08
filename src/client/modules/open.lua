local paymentMethods = require 'settings.paymentMethods'
local openStore = nil



function Store:isRightTime()
  if not self.openingHours then return true end
  local hour = GetClockHours()
  local openHour, closeHour = self.openingHours[1], self.openingHours[2]
  return (openHour <= closeHour and hour >= openHour and hour < closeHour) or
         (openHour > closeHour and (hour >= openHour or hour < closeHour))
end

function Store:sanitizePaymentMethods()
  local sanitized = {}
  for _, method in ipairs(self.paymentMethods) do
    if paymentMethods[method] then
      table.insert(sanitized, {
        id     = method,
        icon   = paymentMethods[method].icon or 'credit-card',
        symbol = paymentMethods[method].symbol or lib.settings.currency,
        name   = paymentMethods[method].name,
      })
    else
      lib.print.info(('Payment method %s does not exist in settings/paymentMethods'):format(method))
    end
  end
  self.paymentMethods = sanitized

end

function Store:openStore()
  if not lib.player.hasGroup(self.groups) then
    return lib.notify({
      title = locale('StoreAccessDenied'),
      description = locale('StoreAccessDeniedGroup'),
      type = 'error',
      duration = 5000,
    })
  end

  if not lib.player.hasLicense(self.licenses) then 
    return lib.notify({
      title = locale('StoreAccessDenied'),
      description = locale('StoreAccessDeniedLicense'),
      type = 'error',
    })
  end 
  

  local canOpen, stock = lib.callback.await('dirk_stores:openStore', self.id)
  if not canOpen then 
    return lib.notify({
      title = locale('StoreAccessDenied'),
      description = locale(stock),
      type = 'error',
    })
  end
  self.stock = stock
 
  local baseTheme = getTheme()
  self.theme = {
    primaryColor = self.theme?.primaryColor or baseTheme.primaryColor,
    primaryShade = self.theme?.primaryShade or baseTheme.primaryShade,
    customTheme  = self.theme?.customTheme or baseTheme.customTheme,
  }
  openStore = self

  -- Checking for group/license locked stock to display default disabled message.
  for k,v in pairs(self.stock) do 
    if not lib.player.hasGroup(v.groups) then 
      v.disabled = {
        icon = 'fa-ban',
        message = locale('GroupRestricted')
      }
    end 

    if not lib.player.hasLicense(v.licenses) then 
      v.disabled = {
        icon = 'fa-ban',
        message = locale('LicenseRestricted')
      }
    end 
  end
  print(json.encode(self.paymentMethods, {indent = true}))
  SendNUIMessage({
    action = 'OPEN_STORE',
    data   = self
  })
  TriggerScreenblurFadeIn(500)
  SetNuiFocus(true, true)
end


function Store:closeStore()
  while IsScreenblurFadeRunning() do Wait(0) end
  TriggerScreenblurFadeOut(0)
  SetNuiFocus(false, false)
  SendNUIMessage({
    action = 'CLOSE_STORE'
  })
  TriggerServerEvent('dirk_stores:closeStore', self.id)
  openStore = nil
end

RegisterNuiCallback('MAKE_TRANSACTION', function(data, cb)
  if not openStore then
    return cb({success = false, error = 'NoOpenStore'})
  end
  if not openStore:isRightTime() then
    return cb({success = false, error = 'StoreClosed'})
  end
  local success, _error = lib.callback.await('dirk_stores:attemptTransaction', openStore.id, data.cart, data.method)
  if success then 
    openStore:closeStore();
  end
  cb({success = success, error = _error})
end)

RegisterNuiCallback('CLOSE_STORE', function(data, cb)
  if not openStore then
    return cb({success = false, error = 'NoOpenStore'})
  end
  openStore:closeStore()
  cb({success = true})
end)


