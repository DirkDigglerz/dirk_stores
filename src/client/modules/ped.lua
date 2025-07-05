local basic = require 'settings.basic'
function Store:spawnPed()
  if not self.models then return end
  for _index, location in pairs(self.locations) do
    local model = self.models[math.random(#self.models)] 
    lib.objects.register(('StorePed:%s:%s'):format(self.id, _index), {
      type = 'ped', 
      model = model,
      pos   = vector4(location.x,location.y, location.z - 1.0, location.w),

      onSpawn = function(data)
        FreezeEntityPosition(data.entity, true)
        SetEntityInvincible(data.entity, true)
        SetBlockingOfNonTemporaryEvents(data.entity, true)
        local options = {
          {
            distance = 1.5,
            label = locale('OpenStore'),
            icon  = 'fas fa-store',

            canInteract = function()
              if not self:isRightTime() then
                return false, locale('StoreClosed')
              end

              return true
            end,

            action = function()
              self:openStore()
            end
          }
        }

        if cache.game == 'redm' then
    
        else 
          if basic.interact == 'interact' then
            lib.interact.entity(data.entity, {
              options = options,
              ignoreLos = true,
              distance = 2.5,
              renderDistance = 5.0,
            })
          else 
            lib.target.entity(data.entity, {
              distance = 1.5, 
              options = options,
            })
          end 
        end 

      end,


      canSpawn = self.openingHours and function()
        return self:isRightTime()
      end or nil
    })
  end
end

function Store:destroyPeds()
  for _index, location in pairs(self.locations) do
    lib.objects.destroy(('StorePed:%s:%s'):format(self.id, _index))
  end
end






