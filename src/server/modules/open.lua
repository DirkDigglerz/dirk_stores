local paymentMethods = require 'settings.paymentMethods'

function Store:openStore(src)
  local canOpen = self.canOpen and self.canOpen(src)
  if not canOpen then return false, 'cannot_open_custom' end

  self.usingStore[src] = true
  local thisPaymentMethods = {}
  for k,v in pairs(self.paymentMethods) do
    table.insert(thisPaymentMethods, {
      id   = v,
      name = paymentMethods[v].name,
      icon = paymentMethods[v].icon,
    })
  end
  print('Opening store', self.name)
  return true, {
    storeInfo = {
      name           = self.name,
      description    = self.description,
      icon           = self.icon,
      paymentMethods = thisPaymentMethods,
    },

    items = self.stock,
    categories = self.categories,
  }
end


lib.callback.register('clean_stores:openStore', function(src, store_id)
  print('Opening store', store_id)
  local store = Store.get(store_id)
  if not store then return false, 'store_not_found' end
  return store:openStore(src)
end)

function Store:closedStore(src)
  self.usingStore[src] = nil
end

RegisterNetEvent('clean_stores:closeStore', function(store_id)
  local store = Store.get(store_id)
  if not store then return end
  store:closedStore(source)
end)