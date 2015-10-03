var {createStore} = require('redux')

var configureReducers = require('./configureReducers')

// In a real app, you'll configure your middleware here rather to create a new
// store creation function rather than using createStore directly.

module.exports = function configureStore(reducerRegistry) {
  var store = createStore(configureReducers(reducerRegistry.get()))

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splittig and for hot reloading
  // reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  })

  return store
}
