RegisterNuiCallback('GET_SETTINGS', function(data, cb)
  cb({
    primaryColor = 'clean', 
    primaryShade = 9, 
     
    -- ADD YOUR SETTINGS HERE THEY WILL PULL WHEN THE UI INITIALIZES
  })
end)

local openStore = function(shop_id)
  local can_open, ui_data = lib.callback.await('clean_shops:openShop', shop_id)
  if not can_open then 
    if ui_data == 'store_in_use' then 
      return print('Store is already in use')
    end
  end
  open_store_id = shop_id
  SendNUIMessage({
    action = 'OPEN_STORE',
    data   = ui_data
  })
  SetNuiFocus(true, true)
end

local closeStore = function()
  if not open_store_id then return end
  SetNuiFocus(false, false)
  SendNUIMessage({
    action = 'CLOSE_STORE'
  })
  TriggerServerEvent('clean_shops:closeStore', open_store_id)
  open_store_id = nil
end

RegisterNuiCallback('ATTEMPT_PURCHASE', function(data, cb)
  local purchased, fail_reason = lib.callback.await('clean_shops:attemptPurchase', data.shop_id, data.cart, data.payment_method)
  if purchased then 
    closeStore();
  end
  cb({purchased = purchased, fail_reason = fail_reason})
end)

RegisterNuiCallback('STORE_CLOSED', function(data, cb)
  closeStore()
end)