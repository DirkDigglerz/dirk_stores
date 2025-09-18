return {
  ['cash'] = {
    name   = 'Cash',
    icon   = 'money-bill-wave',
    symbol = '$',

    add = function(player, amount)
      --// Implement your own bank system here
      local cash_account = (lib.settings.framework == 'qbx_core' or lib.settings.framework == 'qb-core') and 'cash' or 'money'
      return lib.player.addMoney(player, cash_account, amount)
    end,

    remove = function(player, amount)
      --// Implement your own bank system here
      local cash_account = (lib.settings.framework == 'qbx_core' or lib.settings.framework == 'qb-core') and 'cash' or 'money'
      local removed, reason = lib.player.removeMoney(player, cash_account, amount) 
      return removed, reason
    end,


    -- Used client side to get currency.
    get = function()
      return lib.player.getMoney('cash')
    end,
  },
  ['bank'] = {
    name = 'Card',
    icon = 'credit-card',
    symbol = '$',
    
    add = function(player, amount)
      --// Implement your own bank system here
      return lib.player.addMoney(player, 'bank', amount)
    end,

    remove = function(player, amount)
      --// Implement your own bank system here
      return lib.player.removeMoney(player, 'bank', amount)
    end,

    -- Used client side to get currency.
    get = function()
      return lib.player.getMoney('bank')
    end,
  },
  
  ['black_money'] = {
    name = 'Black Money',
    icon = 'skull-crossbones',
    symbol = '$',

    add = function(player, amount)
      --// Implement your own bank system here
      local account = lib.settings.framework == 'es_extended' and 'black_money' or 'markedbills'
      local func = lib.settings.framework == 'es_extended' and 'addMoney' or 'addItem' 
      return lib.player[func](player, account, amount)
    end,

    remove = function(player, amount)
      --// Implement your own bank system here
      local account = lib.settings.framework == 'es_extended' and 'black_money' or 'markedbills'
      local func = lib.settings.framework == 'es_extended' and 'removeMoney' or 'removeItem' 
      return lib.player[func](player, account, amount)
    end,

    -- Used client side to get currency.
    get = function()
      local account = lib.settings.framework == 'es_extended' and 'black_money' or 'markedbills'
      local func = lib.settings.framework == 'es_extended' and 'getMoney' or 'hasItem'
      local table = lib.settings.framework == 'es_extended' and 'player' or 'inventory'
      return lib[table][func](account) or 0
    end,
  },



  -- ['example_item_as_cash'] = {
  --   name = 'Card',
  --   icon = 'user',

  --   add = function(player, amount)
  --     --// Implement your own bank system here
  --     return lib.inventory.addItem(player, 'test_item', amount)
  --   end,

  --   remove = function(player, amount)
  --     --// Implement your own bank system here
--     return lib.inventory.removeItem(player, 'test_item', amount)
  --   end
  -- },
  
}
