var React = require('react')
var {IndexRoute, Route} = require('react-router')

var App = require('./components/App')
var Search = require('./screens/Search')

module.exports = function configureRoutes(reducerRegistry) {
  function getAdminComponent(location, cb) {
    // Webpack code splitting incantation - anything required in the callback
    // will be placed in a new chunk.
    require.ensure([], (require) => {
      // Register the reducer depended upon by the screen component
      reducerRegistry.register({admin: require('./ducks/admin')})
      // Configure hot module replacement for the reducer
      if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
          module.hot.accept('./ducks/admin', () => {
            reducerRegistry.register({admin: require('./ducks/admin')})
          })
        }
      }
      cb(null, require('./screens/Admin'))
    })
  }

  return <Route path="/" component={App}>
    <IndexRoute component={Search}/>
    <Route path="search" component={Search}/>
    <Route path="admin" getComponent={getAdminComponent}/>
  </Route>
}
