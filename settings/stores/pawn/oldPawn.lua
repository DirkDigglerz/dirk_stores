BaseStores = BaseStores or {}
BaseStores.oldPawn = {
  type = 'sell', --## 'sell' or 'buy' 
  name = 'FT Pawn Shop',
  description = 'Sell me your old crusty goods, I will pay as little as I can get away with.',
  icon = 'fas fa-dollar-sign',
  
  ped = {
    model = 'mp_m_shopkeep_01',
    pos   = vector4(412.17913818359, 314.90344238281, 103.13270568848, 217.13822937012),
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
    },
    {
      name = 'chips',
      category = 'Snacks',
      price = 1,
    },
  },
}