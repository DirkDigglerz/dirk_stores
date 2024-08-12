local BasicStore = {}
BasicStore.__index = BasicStore

function BasicStore:spawnBlip()
  if not self.blip then return end 
  lib.blips.register('store'..self.id, {
    pos     = self.blip.pos,
    name    = self.blip.label,
    sprite  = self.blip.sprite,
    display = 4,
    scale   = self.blip.scale,
    color   = self.blip.color,

    canSee = function()
      return true
    end
  })
end

function BasicStore:spawnPed()
  if self.ped then return end
  lib.objects.register('store'..self.id, {
    type = 'ped', 
    model = self.ped.model,
    pos   = self.ped.pos,

    onSpawn = function(data)
      FreezeEntityPosition(data.entity, true)
      SetEntityInvincible(data.entity, true)
      SetBlockingOfNonTemporaryEvents(data.entity, true)


      lib.target.entity(data.entity, {
        distance = 1.5,
        options = {
          {
            distance = 1.5,
            label = 'Open Store',
            icon  = 'fas fa-store',
            action = function()
              openStore(self.id)
            end
          }
        }
      })
    end
  })
end

function BasicStore:__init()
  self:spawnBlip()
  self:spawnPed()
end

BasicStore.new = function(data)
  local self = setmetatable(data, BasicStore)
  self.id = id
  self.resource = GetInvokingResource() or GetCurrentResourceName()
  if self:__init() then 
    return self
  end
  return false
end


lib.player.on('playerLoaded', function()
  for k,v in pairs(Config.stores) do 
    BasicStore.new(v)
  end 
end)