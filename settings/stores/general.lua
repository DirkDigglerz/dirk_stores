BaseStores = BaseStores or {}
BaseStores.downtown247 = {
  type = 'buy', --## 'sell' or 'buy' 
  name = '24/7 Store',
  description = 'A convenience store located in the heart of the city.',
  icon = 'fas fa-store',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(24.368474960327, -1345.2724609375, 29.497034072876, 266.45135498047)
  },

  blip = {
    color   = 27,
    scale   = 0.2,
    sprite  = 587827268,
    display = 2,
  },

  canOpen = function() -- ## Optional function to check if the store can be opened (check license etc?) (server side)
    return true 
  end,

  openingHours = { 0, 24 },--## 24 hour format can also be false or non existent
  
  paymentMethods = { 'cash', 'bank' },


  categories = {
    {
      name = 'Drinks',
      description = 'Refreshing beverages to quench your thirst.',
      icon = 'fas fa-cocktail',
    },
    {
      name = 'Food',
      description = 'Delicious meals to satisfy your hunger.',
      icon = 'fas fa-hamburger',
    },
    {
      name = 'Snacks',
      description = 'Quick bites to keep you going.',
      icon = 'fas fa-cookie',
    },
  },

  stock = {
    {
      name = 'water',
      category = 'Drinks',
      price = 1,
    },
    {
      name = 'bread',
      category = 'Food',
      price = 2,
    },
    {
      name = 'burger',
      category = 'Food',
      price = 5,
      stock = 3,
    },
    {
      name = 'chips',
      category = 'Snacks',
      price = 1,
    },
  },
}


