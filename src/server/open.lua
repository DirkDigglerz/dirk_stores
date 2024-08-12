function Store:openStore(src)
  if self.usingStore then return false, 'store_in_use' end
  self.usingStore = src
  local paymentMethods = {}
  for k,v in pairs(self.paymentMethods) do
    table.insert(paymentMethods, {
      id   = v,
      name = Config.paymentMethods[v].name,
      icon = Config.paymentMethods[v].icon,
    })
  end
  return (
    shopInfo = {
      name           = self.name,
      description    = self.description,
      icon           = self.icon,
      paymentMethods = paymentMethods,
    },

    items = self.stock,
    categories = self.categories,
  )
end

lib.callback.register('clean_shops:openStore', nil, function(src, store_id)
  local store = Store.get(store_id)
  if not store then return false, 'store_not_found' end
  return store:openStore(src)
end)

function Store:closedStore(src)
  if self.usingStore ~= src then return false, 'store_not_in_use' end
  self.usingStore = nil
end

RegisterNetEvent('clean_shops:closeStore', function(store_id)
  local store = Store.get(store_id)
  if not store then return end
  store:closedStore(source)
end)