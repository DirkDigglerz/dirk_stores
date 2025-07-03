BaseStores = BaseStores or {}
BaseStores.supermarket247 = {
  type = 'buy', --## 'sell' or 'buy' 
  name = '24/7 Store',
  description = 'For low quality products at incredibly marked up prices, we have you covered!',
  icon = 'fas fa-store',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(24.47, -1346.62, 29.5, 271.66),
    vector4(-3039.54, 584.38, 7.91, 17.27),
    vector4(-3244.4020996094, 1000.1966552734, 12.8307056427, 353.50509643555),
    vector4(1728.07, 6415.63, 35.04, 242.95),
    vector4(1959.82, 3740.48, 32.34, 301.57),
    vector4(549.13, 2670.85, 42.16, 99.39),
    vector4(2677.47, 3279.76, 55.24, 335.08),
    vector4(2556.66, 380.84, 108.62, 356.67),
    vector4(372.66, 326.98, 103.57, 253.73),
vector4(2749.529296875, 3472.4411621094, 55.677677154541, 324.08737182617)
  },

  blip = {
    color   = 27,
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


