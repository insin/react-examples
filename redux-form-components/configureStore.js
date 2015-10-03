var {createStore} = require('redux')

var rootReducer = require('./reducers')

module.exports = function configureStore() {
  var store = createStore(rootReducer)

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./reducers', () => {
        var nextRootReducer = require('./reducers')
        store.replaceReducer(nextRootReducer)
      })
    }
  }

  return store
}
