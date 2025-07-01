return {
  flip_phone = function()
    local newPhone = exports.dirk_burnerphone:registerPhone({
      model = 'flip',
    })
      
    return {
      imei  = newPhone.imei,
      model = 'flip',
    }
  end, 
}