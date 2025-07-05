# ![ProdBanner](https://dirkscripts-site-git-main-dirkdigglerzs-projects.vercel.app/banners/stores.png)

# Download
[![GitHub repo](https://img.shields.io/badge/GitHub-dirk__stores-181717?logo=github)](https://github.com/DirkDigglerz/dirk_stores)


## Description  
A **free**, simple, and flexible **store system** for **FiveM**, styled natively and designed to be themed easily to fit your server’s aesthetic.

## Features
- **Default Stores**
 Has most if not all of the default stores configured with basic items from major inventories/frameworks but is fully adjustable.

- **Categories**
Optionally have categories for your stores for easier navigation.

- **Metadata Generators**  
  Supports adding **unique metadata** to specific items, even if your inventory system doesn’t handle it natively.

- **Group/License Locking**
Lock the entire store or certain items to different groups or licenses within your city. 

- **Payment Methods**
Easily add new payment methods to use in any store via the settings/paymentMethods.lua. Here you can define an add and a remove function to implement any sort of currency you wish.

- **Dynamic Store Creation**  
  Register new stores at **runtime** from the server, giving you complete control over when and where stores appear.

- **Theming**  
  Change the **color scheme** globally or per store. Don't like green? Pick something that matches your vibe. To set a new global theme for all dirk_scripts see [dirk_lib convars](https://docs.dirkscripts.com/resources/dirk-lib/getting-started#convars)

---

## UI

![Screenshot](https://i.imgur.com/Bl3PXhv.png)
![RedMVariant](https://i.imgur.com/2NwuZie.png)

## Dynamic Store Registration

Create stores dynamically using a single export. You can also update any store at runtime via exports.
```lua
exports['dirk_stores']:registerStore({
  id   = 'test_store',
  type = 'buy', -- 'sell' or 'buy'
  name = 'Test Store',
  description = 'This is a test store',
  icon = 'user',
  modelType = 'ped', -- Can also be 'object' or 'vehicle'
  models = {'mp_m_shopkeep_01', 'mp_f_shopkeep_01'},
  locations = { 
    vector4(24.368, -1345.272, 29.497, 266.45),
    vector4(25.0, -1346.0, 29.5, 270.0)
  },

  paymentMethods = {'cash', 'bank'},

  categories = {
    {
      name = 'Category 1', 
      icon = 'user', 
      description = 'Category 1 description'
    },
  },

  -- OPENING CONDITIONS
  openingHours   = { 0, 24 }, -- 24-hour format or omit for always open
  groups = {
    police = 1,
  },
  licenses = {},
  discordRoles = {},

  stock = {
    {
      name = 'item_1', 
      label = 'Item 1', 
      price = 100, 
      image = 'https://raw.githubusercontent.com/fazitanvir/items-images/main/license/driver_license.png', 
      license = 'firearms', -- Optional
      description = 'This is a driver’s license. You could probably drive with it.', 
      category = 'Category 1', 
      stock = 10
    },
  },

  onExchange = function(ply, items, totalPrice)
    -- Use this to log, route money, or trigger server logic
  end,

  theme? = {
    primaryColor = 'green', -- Mantine colors or "custom" if using customTheme  
    primaryShade = 9,       -- Primary shade (index in array if custom theme) of your color to use.
    customTheme  = {
      -- Array of 9 colors from bright to dark
    },
  }
})
```
## Dependencies
- [dirk_lib](https://github.com/DirkDigglerz/dirk_lib)

## RedM 
I styled this to also suit RedM (will detect automatically the game) however I do not have bridging in place for VORP-Core, feel free to add this yourself in a PR or privately.


|                                         |                                |
|-------------------------------------|----------------------------|
| Code is accessible       | Yes             |
| Subscription-based      | No                 |
| Lines (approximately)  | 300-500 Lua 2-3k TS |
| Requirements                | dirk_lib     |
| Support                           | Yes                 |
