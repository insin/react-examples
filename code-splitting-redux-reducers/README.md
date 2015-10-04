# [Code Splitting Redux Reducers Example](http://insin.github.io/react-examples/code-splitting-redux-reducers/)

Example of using [webpack code splitting](http://webpack.github.io/docs/code-splitting.html) with [React Router](https://github.com/rackt/react-router), including the [Redux](https://github.com/rackt/redux) reducer(s) dynamically-loaded components depend on in the same chunk and updating the Redux store's root reducer on the fly.

This example uses [Redux reducer bundles (a.k.a. "Ducks")](https://github.com/erikras/ducks-modular-redux) and also supports hot reloading of duck modules loaded via a chunk.

## Implementation

Reducer functions are registered by name in a `ReducerRegistry` object (based on code in [rackt/redux#37](https://github.com/rackt/redux/issues/37)). Reducers included in the app's entry module are provided as initial reducers:

```js
var coreReducers = require('./ducks/core')
var reducerRegistry = new ReducerRegistry(coreReducers)
```

This is passed to functions which create the React Router routes and Redux store respectively:

```js
var routes = configureRoutes(reducerRegistry)
var store = configureStore(reducerRegistry)
```

When creating the store, register a callback which will replace the store's root reducer any time reducer registration changes:

```js
reducerRegistry.setChangeListener((reducers) => {
  store.replaceReducer(configureReducers(reducers))
})
```

When dynamically loading the component for a route, require and register reducer(s) it depends on first:

```js
<Route path="admin" getComponent={(location, cb) => {
  require.ensure([], require => {
    reducerRegistry.register({admin: require('./ducks/admin')})
    cb(null, require('./screens/Admin'))
  })
}}/>
```

Hot reloading of reducers must be configured manually, but depends on the same principle of the root reducer being replaced any time the `ReducerRegistry` is changed:

```js
if (module.hot) {
  module.hot.accept('./ducks/core', () => {
    var nextCoreReducers = require('./ducks/core')
    reducerRegistry.register(nextCoreReducers)
  })
}
```

(Using a single module to import and re-export all your app's core reducers allows you to configure hot reloading for them in one place).
