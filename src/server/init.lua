-- if using qb-core check if qb-shops or qb-pawnshops is running and stop it 
lib.checkDependency('dirk_lib', '1.2.3', true)
if lib.settings.framework == 'qb-core' then
  if GetResourceState('qb-shops') == 'started' then
    lib.print.info('Stopping qb-shops as it is not compatible with dirk_stores')
    StopResource('qb-shops')
  end

  if GetResourceState('qb-pawnshops') == 'started' then
    lib.print.info('Stopping qb-pawnshops as it is not compatible with dirk_stores')
    StopResource('qb-pawnshops')
  end
end

for k,v in pairs(BaseStores) do
  v.id = k 
  Store.register(v)
end 
Store.loadedFromFile = true



