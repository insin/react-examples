var React = require('react')
var {Provider} = require('react-redux')
var {Router} = require('react-router')

var reducerRegistry = require('./ducks/registry')
var coreReducers = require('./ducks/core')
var configureStore = require('./configureStore')
var configureRoutes = require('./configureRoutes')

reducerRegistry.register(coreReducers)

// Configure hot module replacement for core reducers
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./ducks/core', () => {
      var nextCoreReducers = require('./ducks/core')
      reducerRegistry.register(nextCoreReducers)
    })
  }
}

var store = configureStore(reducerRegistry)
var routes = configureRoutes(reducerRegistry)

React.render(
  <Provider store={store}>
    {() => <Router routes={routes}/>}
  </Provider>,
  document.querySelector('#example')
)
