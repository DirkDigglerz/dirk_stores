BaseStores = BaseStores or {}
BaseStores.ammunation = {
  type = 'buy',
  name = 'Goop Store',
  description = 'The GOOP STORE',
  icon = 'fa-solid fa-gun',
  modelType = 'ped',
  models = {'a_m_y_hasjew_01'},
  locations = { 
    vector4(-42.6, -1831.26, 26.29, 317.84)
  },

  paymentMethods = {'cash', 'bank'},

  categories = {
    {
      name = 'Class 1', 
      icon = 'user', 
      description = 'Class 1 Weapons'
    },
    {       
      name = 'Class 2', 
      icon = 'user', 
      description = 'Class 2 Weapons'
    },
    {   
      name = 'Class 3', 
      icon = 'user', 
      description = 'Class 3 Weapons'
    },
    {
      name = 'Ammo & Armour', 
      icon = 'user', 
      description = 'Ammo & Armour'
    },
    {
      name = 'Attachments & Tints', 
      icon = 'user', 
      description = 'Attachments & Tints'
    },
  },

  stock = {
    { name = 'WEAPON_JR_MK47', label = 'Mk47 Mutant', price = 0, category = 'Class 3' },
    { name = 'WEAPON_JR_CARBINERIFLEMK2', label = 'CarbineRifle Mk2', price = 0, category = 'Class 3' },
    { name = 'WEAPON_JR_ASSAULTRIFLEMK2', label = 'Assaultrifle Mk2', price = 0, category = 'Class 3' },
    { name = 'WEAPON_JR_HEAVYRIFLE', label = 'PD Heavy Rifle', price = 0, category = 'Class 3' },
    { name = 'WEAPON_AKS74U', label = 'AKS74U', price = 0, category = 'Class 2' },
    { name = 'WEAPON_MPX', label = 'PD MPX', price = 0, category = 'Class 2' },
    { name = 'WEAPON_JR_SICARIO', label = 'Sicario Smg', price = 0, category = 'Class 2' },
    { name = 'WEAPON_JR_PDW', label = 'Combat PDW', price = 0, category = 'Class 2' },
    { name = 'WEAPON_JR_PDCARBINE', label = 'PD Carbine', price = 0, category = 'Class 1' },
    { name = 'WEAPON_JR_DEAGLE', label = 'Deagle', price = 0, category = 'Class 1' },
    { name = 'WEAPON_JR_HEAVYPISTOL', label = 'Heavy Pistol', price = 0, category = 'Class 1' },
    { name = 'WEAPON_JR_USP45', label = 'USP45', price = 0, category = 'Class 1' },
    { name = 'WEAPON_FN509', label = 'PD Service Pistol MK2', price = 0, category = 'Class 1' },
    { name = 'WEAPON_GLOCK20', label = 'PD Service Pistol', price = 0, category = 'Class 1' },
    { name = 'WEAPON_JR_BERETTA', label = 'Beretta', price = 0, category = 'Class 1' },
    { name = 'WEAPON_MP5', label = 'PD MP5', price = 0, category = 'Class 2' },
    { name = 'oxy', label = 'oxy', price = 0, category = 'Ammo & Armour' },
    { name = 'armor_vest', label = 'Armor Vest', price = 0, category = 'Ammo & Armour' },
    { name = 'armor_plate1', label = 'Police Armor Plate', price = 0, category = 'Ammo & Armour' },
    { name = 'pistol_box', label = 'Pistol Ammo', price = 0, category = 'Ammo & Armour' },
    { name = 'smg_box', label = 'SMG Ammo', price = 0, category = 'Ammo & Armour' },
    { name = 'greentint', label = 'Green Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'goldtint', label = 'Gold Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'pinktint', label = 'Pink Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'tantint', label = 'Tan Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'bluetint', label = 'Blue Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'orangetint', label = 'Orange Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'platinumtint', label = 'Platinum Weapon Tint', price = 0, category = 'Attachments & Tints' },
    { name = 'at_scope_small', label = 'SMG Scope', price = 0, category = 'Attachments & Tints' },
    { name = 'at_clip_extended_smg', label = 'SMG Extended', price = 0, category = 'Attachments & Tints' },
    { name = 'at_suppressor_heavy', label = 'SMG Suppressor', price = 0, category = 'Attachments & Tints' },
    { name = 'at_grip', label = 'SMG Grip', price = 0, category = 'Attachments & Tints' },
  },



  theme = {
    primaryColor = 'blue',
    primaryShade = 5,
    customTheme  = {
      -- Array of 9 colors from bright to dark
    },
  },

}