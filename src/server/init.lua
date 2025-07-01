for k,v in pairs(BaseStores) do
  v.id = k 
  Store.register(v)
end 
Store.loadedFromFile = true