function Store:spawnBlip()
  if not self.blip or not self.blip.sprite then
    return
  end
  for _index, location in pairs(self.locations) do 
    lib.blip.register(('Store:%s:%s'):format(self.id, _index), {
      pos     = location.xy or vector3(0,0,0),
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
end

function Store:destroyBlips()
  for _index, location in pairs(self.locations) do 
    lib.blip.destroy(('Store:%s:%s'):format(self.id, _index))
  end
end