BaseStores = BaseStores or {}
BaseStores.downtown247 = {
  type = 'buy', --## 'sell' or 'buy' 
  name = 'Downtown 24/7',
  description = 'A convenience store located in the heart of the city.',
  icon = 'fas fa-store',
  
  ped = {
    model = 'mp_m_shopkeep_01',
    pos   = vector4(24.468175888062, -1345.6422119141, 29.497022628784, 278.44668579102),
  },

  blip = {
    color   = 27,
    scale   = 0.8,
    sprite  = 59,
    display = 2,
  },

  canOpen = function() -- ## Optional function to check if the store can be opened (check license etc?) (server side)
    return true 
  end,

  openingHours = { --## 24 hour format can also be false or non existent
    { 0, 24 },
  },

  paymentMethods = { 'cash', 'card' },


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