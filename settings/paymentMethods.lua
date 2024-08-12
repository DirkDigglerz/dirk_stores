Config.paymentMethods = {
  ['bank'] = {
    name = 'Bank',
    icon = 'user',

    remove = function(player, amount)
      --// Implement your own bank system here
      return true
    end
  },

}