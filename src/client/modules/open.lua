local paymentMethods = require 'settings.paymentMethods'
local openStore = nil

function Store:hasGroup()
  if not self.groups then return true end
  local myJob, myGang = cache.job, cache.gang
  for k,v in pairs(self.groups) do
    if k == myJob or k == myGang then
      if v <= myJob.grade or v <= myGang.grade then
        return true
      end
    end
  end
  return false
end

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
  if not self:hasGroup() then
    return lib.notify({
      title = locale('StoreAccessDenied'),
      description = locale('StoreAccessDeniedDesc'),
      type = 'error',
      duration = 5000,
    })
  end
  local canOpen, stock = lib.callback.await('dirk_stores:openStore', self.id)
  if not canOpen then 
    return lib.print.debug(('Store %s cannot be opened reason: %s'):format(self.id, uiData))
  end
  self.stock = stock
 
  local baseTheme = getTheme()
  self.theme = {
    primaryColor = self.theme?.primaryColor or baseTheme.primaryColor,
    primaryShade = self.theme?.primaryShade or baseTheme.primaryShade,
    customTheme  = self.theme?.customTheme or baseTheme.customTheme,
  }
  openStore = self
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


