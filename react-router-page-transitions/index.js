require('./style.css')

var CSSTransitionGroup = require('react-addons-css-transition-group')
var React = require('react')
var {render} = require('react-dom')
var {IndexRoute, Link, Route, Router} = require('react-router')

var TRANSITIONS = [
  {name: 'fade', time: 250},
  {name: 'slide', time: 500}
]

var App = React.createClass({
  getInitialState() {
    return {
      transitionIndex: '0'
    }
  },
  handleTransitionChange(e) {
    this.setState({transitionIndex: e.target.value})
  },
  render() {
    var {pathname} = this.props.location
    var {transitionIndex} = this.state
    var transition = TRANSITIONS[transitionIndex]
    return <div className="App">
      <label>Type: <select onChange={this.handleTransitionChange} value={this.state.transitionIndex}>
        {TRANSITIONS.map(({name}, i) => <option value={i} key={name}>{name}</option>)}
      </select></label>
      <div>
        <Link to="page1">Page 1</Link> | <Link to="page2">Page 2</Link> | <Link to="page3">Page 3</Link>
      </div>
      <CSSTransitionGroup
        className="page-container"
        component="div"
        transitionEnterTimeout={transition.time}
        transitionLeaveTimeout={transition.time}
        transitionName={transition.name}>
        {React.cloneElement(this.props.children, {key: pathname})}
      </CSSTransitionGroup>
    </div>
  }
})

var routes = <Route path="/" component={App}>
  <IndexRoute component={require('./Page1')}/>
  <Route path="page1" component={require('./Page1')}/>
  <Route path="page2" component={require('./Page2')}/>
  <Route path="page3" component={require('./Page3')}/>
</Route>

render(<Router routes={routes}/>, document.querySelector('#example'))
