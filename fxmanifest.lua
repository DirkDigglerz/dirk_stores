 
fx_version 'cerulean' 
lua54 'yes' 
games { 'rdr3', 'gta5' } 
author 'DirkScripts' 
description 'Stores | Clean Pack' 
version      '1.0.27'

shared_script{
  '@clean_lib/init.lua',
  'src/shared/*.lua',
  'settings/stores/**/*.lua',
}

client_script { 
  'src/client/*.lua',
} 

server_script { 
  'src/server/class.lua',
  'src/server/modules/*.lua',
  'src/server/basic.lua',
}
 
ui_page 'web/build/index.html'

files {
  'settings/*.lua',
  'settings/**/*.lua',
  'locales/*.*',
  'web/build/index.html',
  'web/build/**/*',
}

dependencies {
  'clean_lib'	
}

escrow_ignore {
  'locales/*.*',
  'settings/*.lua',
  'settings/**/*.lua',
  'web/build/index.html',
  'web/build/**/*',
}
