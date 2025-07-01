 
fx_version 'cerulean' 
lua54 'yes' 
games { 'rdr3', 'gta5' } 
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
author 'DirkScripts' 
description 'Stores | Dirk Pack' 
version      '1.0.31'

shared_script{
  '@dirk_lib/init.lua',
  'src/shared/*.lua',
  'settings/stores/**/*.lua',
}

server_script { 
  'src/server/class.lua',
  'src/server/modules/*.lua',
  'src/server/init.lua',
}

client_script { 
  'src/client/class.lua',
  'src/client/modules/*.lua',
  'src/client/init.lua',
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
  'dirk_lib'	
}

escrow_ignore {
  'locales/*.*',
  'settings/*.lua',
  'settings/**/*.lua',
  'web/build/index.html',
  'web/build/**/*',
}
