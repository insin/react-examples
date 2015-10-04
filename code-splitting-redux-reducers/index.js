var React = require('react')
var {Provider} = require('react-redux')
var {Router} = require('react-router')

var configureRoutes = require('./configureRoutes')
var configureStore = require('./configureStore')
var coreReducers = require('./ducks/core')
var ReducerRegistry = require('./ReducerRegistry')

var reducerRegistry = new ReducerRegistry(coreReducers)

// Configure hot module replacement for core reducers
if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./ducks/core', () => {
      var nextCoreReducers = require('./ducks/core')
      reducerRegistry.register(nextCoreReducers)
    })
  }
}

var routes = configureRoutes(reducerRegistry)
var store = configureStore(reducerRegistry)

React.render(
  <Provider store={store}>
    {() => <Router routes={routes}/>}
  </Provider>,
  document.querySelector('#example')
)
