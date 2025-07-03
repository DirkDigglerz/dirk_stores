BaseStores = BaseStores or {}
BaseStores.ltdGasoline = {
  type = 'buy', --## 'sell' or 'buy' 
  name = 'LTD Gasoline',
  description = 'Watered down gas and overpriced snacks, what more could you want?',
  icon = 'fas fa-gas-pump',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(-48.5, -1757.5, 29.42, 0.0),
    vector4(-709.17, -909.56, 19.22, 0.0),
    vector4(1166.02, -321.2, 69.21, 0.0),
    vector4(-1437.62, -276.74, 46.21, 0.0),
    vector4(1698.45, 4924.15, 42.06, 0.0),
    vector4(-1820.33, 794.45, 138.09, 0.0),
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
}


