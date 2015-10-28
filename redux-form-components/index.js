require('bootstrap/dist/css/bootstrap.min.css')
require('react-widgets/dist/css/react-widgets.css')
require('./react-widgets-overrides.css')

var React = require('react')
var {Provider} = require('react-redux')
var {render} = require('react-dom')

// Configure react-widgets localisation to use Globalize 0.1.x
var Globalize = require('globalize')
require('globalize/lib/cultures/globalize.culture.en-GB')
Globalize.culture('en-GB')
require('react-widgets/lib/localizers/globalize')(Globalize)

var AddTravel = require('./components/AddTravel')
var configureStore = require('./configureStore')

var store = configureStore()

render(
  <Provider store={store}><AddTravel/></Provider>,
  document.querySelector('#example')
)
