require('bootstrap/dist/css/bootstrap.min.css')
require('react-widgets/dist/css/react-widgets.css')
require('./react-widgets-overrides.css')

var React = require('react')
var {Provider} = require('react-redux')

var AddTravel = require('./components/AddTravel')
var configureStore = require('./configureStore')

var store = configureStore()

React.render(
  <Provider store={store}>{() => <AddTravel/>}</Provider>,
  document.querySelector('#example')
)
