 
fx_version 'cerulean' 
lua54 'yes' 
games { 'rdr3', 'gta5' } 
author 'DirkScripts' 
description 'React Boilerplate for FiveM | Uses mantine for theming' 
version      'main'

shared_script{
  'src/settings/config.lua',
  'src/settings/paymentMethods.lua',
  'src/stores/*.lua',
}

client_script { 
  'src/client/ui.lua', 
  'src/client/stores.lua',
} 
 
ui_page 'web/build/index.html'
files {
	'web/build/index.html',
	'web/build/**/*',
}