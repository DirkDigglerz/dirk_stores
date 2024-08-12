Config.stores.downtown247 = {

  name = 'Downtown 24/7',
  description = 'A convenience store located in the heart of the city.',
  icon = 'fas fa-store',
  
  ped = {
    model = 's_m_y_shop_mask',
    pos   = vector4(-1487.0, -378.0, 40.0, 160.0),
  },

  blip = {
    pos    = vector3(-1487.0, -378.0, 40.0),
    label  = 'Downtown 24/7',
    sprite = 52,
    color  = 2,
    scale  = 0.8,
    label  = 'Downtown 24/7',
  },

  paymentMethods = { 'cash', 'card' },
  categories = {
    {
      name = 'Drinks',
      icon = 'fas fa-cocktail',
    },
    {
      name = 'Food',
      icon = 'fas fa-hamburger',
    },
    {
      name = 'Snacks',
      icon = 'fas fa-cookie',
    },
  },

  stock = {
    {
      name = 'Water',
      category = 'Drinks',
      price = 1,
      icon = 'fas fa-tint',
    },
    {
      name = 'Soda',
      category = 'Drinks',
      price = 2,
      icon = 'fas fa-glass-whiskey',
    },
    {
      name = 'Burger',
      category = 'Food',
      price = 5,
      icon = 'fas fa-hamburger',
    },
    {
      name = 'Chips',
      category = 'Snacks',
      price = 1,
      icon = 'fas fa-cookie',
    },
  },
}