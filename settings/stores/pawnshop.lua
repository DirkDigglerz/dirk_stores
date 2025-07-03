BaseStores = BaseStores or {}
BaseStores.pawnshop = {
  type = 'sell', --## 'sell' or 'buy' 
  name = 'Pawn Shop',
  description = 'We buy anything and everything, no questions asked!',
  icon = 'fas fa-hand-holding-dollar',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(412.30889892578, 314.85986328125, 103.13275909424, 214.03395080566)
  },

  blip = {
    color   = 46,
    scale   = 0.8,
    sprite  = 365,
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
      name = 'cola',
      category = 'Drinks',
      price = 1,
    },
  },

  theme = {
    primaryColor = 'red',
  }
}


