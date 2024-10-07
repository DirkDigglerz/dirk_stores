local config = require 'settings.config'
local BasicStore = {}
BasicStore.__index = BasicStore
function BasicStore:spawnBlip()
  if not self.blip then return end 
  lib.blip.register('store'..self.id, {
    pos     = self.ped.pos.xyz or self.blip.pos.xyz or vector3(0,0,0),
    name    = self.name,
    sprite  = self.blip.sprite,
    display = 4,
    scale   = self.blip.scale,
    color   = self.blip.color,

    canSee = self.openingHours and function()
      return self:isRightTime()
    end or nil
  })
end


function BasicStore:isRightTime()
  if not self.openingHours then return true end
  local hour = GetClockHours()
  for k,v in pairs(self.openingHours) do 
    if hour >= v[1] and hour < v[2] then 
      return true
    end
  end
  return false
end

function BasicStore:spawnPed()
  if not self.ped then return end
  lib.objects.register('storeClerk:'..self.id, {
    type = 'ped', 
    model = self.ped.model,
    pos   = vector4(self.ped.pos.x, self.ped.pos.y, self.ped.pos.z - 1.0, self.ped.pos.w),

    onSpawn = function(data)
      FreezeEntityPosition(data.entity, true)
      SetEntityInvincible(data.entity, true)
      SetBlockingOfNonTemporaryEvents(data.entity, true)
      local options = {
        {
          distance = 1.5,
          label = locale('open_store'),
          icon  = 'fas fa-store',
          action = function()
            openStore(self.id)
          end
        }
      }

      if config.pedInteract == 'interact' then
        lib.interact.entity(data.entity, {
          options = options,
          distance = 1.5,
          renderDistance = 5.0,
        })
      else 
        lib.target.entity(data.entity, {
          distance = 1.5, 
          options = options,
        })
      end 
    end,


    canSpawn = self.openingHours and function()
      return self:isRightTime()
    end or nil
  })
end

function BasicStore:__init()
  self:spawnBlip()
  self:spawnPed()
end

BasicStore.new = function(id, data)
  local self = setmetatable(data, BasicStore)
  self.id = id 
  self.resource = GetInvokingResource() or GetCurrentResourceName()
  if self:__init() then 
    return self
  end
  return false
end


lib.onCache('playerLoaded', function(data)
  if not data then return end
  for k,v in pairs(BaseStores) do 
    BasicStore.new(k, v)
  end 
end)