BaseStores = BaseStores or {}
BaseStores.ammunation = {
  type = 'buy', --## 'sell' or 'buy' 
  name = 'Ammunation',
  description = 'Faulty firearms and overpriced ammunition, what more could you want?',
  icon = 'fas fa-gun',
  
  models = {'mp_m_shopkeep_01'}, --## Ped model to spawn (randomly selected from the list)
  locations = {
    vector4(22.470691680908, -1105.3994140625, 29.797008514404, 162.98078918457),  -- NEAR LEGION
    vector4(810.22869873047, -2159.1435546875, 29.619016647339, 356.72598266602),  -- SOUTH EAST AMMUNATION
    vector4(841.48986816406, -1035.3930664062, 28.194864273071, 355.58792114258),  -- NEAR MIRROR PARK
    vector4(-661.33892822266, -933.61248779297, 21.829238891602, 173.55712890625), -- NEAR BEACH AREA
    vector4(-1304.2788085938, -395.05575561523, 36.695762634277, 79.229972839355), -- NORTH OF BEACH
    vector4(1692.5540771484, 3761.21484375, 34.705318450928, 228.0951385498),      -- SANDY SHORES
    vector4(-330.87115478516, 6085.748046875, 31.454778671265, 221.40034484863), -- PALETO BAY
    vector4(-1118.2666015625, 2700.38671875, 18.554151535034, 219.1848449707), -- SOUTH OF MILITARY BASE
    vector4(2566.9125976562, 292.54739379883, 108.73485565186, 354.51898193359), -- NORTH EAST OF THE CITY
    vector4(-3173.2419433594, 1089.140625, 20.838743209839, 249.56518554688), -- NORTH WEST OF THE CITY
  },

  blip = {
    color   = 0,
    scale   = 0.8,
    sprite  = 110,
    display = 2,
  },

  canOpen = function() -- ## Optional function to check if the store can be opened (check license etc?) (server side)
    return true 
  end,

  licenses = 'weapons', --## Could also be {'weapons', 'firearms'},


  openingHours = { 0, 24 },--## 24 hour format can also be false or non existent
  
  paymentMethods = { 'cash', 'bank', 'black_money'},

  categories = {
    {
      name = 'Melee Weapons',
      description = 'Close combat weapons',
      icon = 'fas fa-fist-raised',
    },
    {
      name = 'Firearms',
      description = 'Rifles, shotguns, and handguns',
      icon = 'fas fa-bullseye',
    }, 
    {
      name = 'Ammunition',
      description = 'Bullets and shells.',
      icon = 'fas fa-bullet',
    },
    {
      name = 'Accessories',
      description = 'Scopes, suppressors and more.',
      icon = 'fas fa-tools',
    }
  },

  stock = {
    -- FIREARMS
    {
      name = 'weapon_pistol',
      category = 'Firearms',
      licenses = 'superLicense',
      price = 1500,
    },
    {
      name = 'weapon_snspistol',
      category = 'Firearms',
      price = 2000,
    },
    {
      name = 'weapon_vintagepistol',
      category = 'Firearms',
      price = 2500,
    },
    -- MELE WEAPONS
    {
      name = 'weapon_bat',
      category = 'Melee Weapons',
      price = 100,
    },
    {
      name ='weapon_hatchet',
      category = 'Melee Weapons',
      price = 300,
    },
    {
      name = 'weapon_knife',
      category = 'Melee Weapons',
      price = 50,
    },
    -- AMMUNITION
    {
      name = 'ammo_pistol',
      category = 'Ammunition',
      price = 50,
    },
    {
      name = 'ammo_shotgun',
      category = 'Ammunition',
      price = 75,
    },
    -- ACCESSORIES
    {
      name = 'weapon_flashlight',
      category = 'Accessories',
      price = 100,
    },
    {
      name = 'weapon_suppressor',
      category = 'Accessories',
      price = 500,
    },

  },
}


