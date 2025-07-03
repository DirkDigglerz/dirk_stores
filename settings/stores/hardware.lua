BaseStores = BaseStores or {}
BaseStores.hardware = {
  type = 'buy', --## 'sell' or 'buy' 
  name = 'Hardware Store',
  description = 'Your one-stop shop for all things hardware, from tools to building materials!',
  icon = 'fas fa-tools',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(2747.8264160156, 3472.0263671875, 55.674186706543, 259.00454711914), -- NEAR SANDY
  },

  blip = {
    color   = 29,
    scale   = 0.8,
    sprite  = 52,
    display = 2,
  },

  canOpen = function() -- ## Optional function to check if the store can be opened (check license etc?) (server side)
    return true 
  end,

  openingHours = { 0, 24 },--## 24 hour format can also be false or non existent
  
  paymentMethods = { 'cash', 'bank' },

  stock = {
    { name = 'crowbar',            price = 400, amount = 150 },
    { name = 'lockpick',          price = 200, amount = 50 },
    { name = 'weapon_wrench',     price = 250, amount = 250 },
    { name = 'weapon_hammer',     price = 250, amount = 250 },
    { name = 'repairkit',         price = 250, amount = 50, requiredJob = { 'mechanic', 'police' } },
    { name = 'screwdriverset',    price = 350, amount = 50 },
    { name = 'phone',             price = 850, amount = 50 },
    { name = 'radio',             price = 250, amount = 50 },
    { name = 'binoculars',        price = 50,  amount = 50 },
    { name = 'firework1',         price = 50,  amount = 50 },
    { name = 'firework2',         price = 50,  amount = 50 },
    { name = 'firework3',         price = 50,  amount = 50 },
    { name = 'firework4',         price = 50,  amount = 50 },
    { name = 'cleaningkit',       price = 150, amount = 150 },
    { name = 'advancedrepairkit', price = 500, amount = 50, requiredJob = 'mechanic' },
  }
}


