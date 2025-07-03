BaseStores = BaseStores or {}
BaseStores.robsLiquor = {
  type = 'buy', --## 'sell' or 'buy' 
  name = 'Robs Liquor',
  description = 'We don\'t sell alcohol, we sell happiness in a bottle!',
  icon = 'fas fa-wine-glass-alt',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(1134.44, -982.64, 46.41, 269.09),
    vector4(-1750.26, 282.6, 88.13, 226.6),
    vector4(-2968.78, 390.46, 15.04, 11.26),
    vector4(1167.47, 2709.56, 38.15, 88.36),
    vector4(-1486.31, -378.05, 40.16, 85.9),
    vector4(-1223.49, -908.33, 11.33, 125.71),
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


