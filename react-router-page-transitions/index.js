require('./style.css')

var CSSTransitionGroup = require('react-addons-css-transition-group')
var React = require('react')
var StaticContainer = require('react-static-container')
var {render} = require('react-dom')
var {IndexRoute, Link, Route, Router} = require('react-router')

var TRANSITIONS = [
  {name: 'fade', enterTimeout: 1000, leaveTimeout: 500},
  {name: 'slide', enterTimeout: 1000, leaveTimeout: 1000}
]

// From https://github.com/rackt/react-router/blob/master/examples/animations/app.js
var RouteCSSTransitionGroup = React.createClass({
  contextTypes: {
    location: React.PropTypes.object
  },
  getInitialState() {
    return {
      previousPathname: null
    }
  },
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setState({ previousPathname: this.context.location.pathname })
    }
  },
  componentDidUpdate() {
    if (this.state.previousPathname) {
      this.setState({previousPathname: null}) // eslint-disable-line react/no-did-update-set-state
    }
  },
  render() {
    var {children, ...props} = this.props
    var {previousPathname} = this.state

    return <CSSTransitionGroup {...props}>
      <StaticContainer
        key={previousPathname || this.context.location.pathname}
        shouldUpdate={!previousPathname}
      >
        {children}
      </StaticContainer>
    </CSSTransitionGroup>
  }
})

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
    var {transitionIndex} = this.state
    var transition = TRANSITIONS[transitionIndex]
    return <div className="App">
      <label>Type: <select onChange={this.handleTransitionChange} value={this.state.transitionIndex}>
        {TRANSITIONS.map(({name}, i) => <option value={i} key={name}>{name}</option>)}
      </select></label>
      asd
      <div>
        <Link to="/page1">Page 1</Link> | <Link to="/page2">Page 2</Link> | <Link to="/page3">Page 3</Link>
      </div>
      <RouteCSSTransitionGroup
        className="page-container"
        component="div"
        transitionEnterTimeout={transition.enterTimeout}
        transitionLeaveTimeout={transition.leaveTimeout}
        transitionName={transition.name}>
        {this.props.children}
      </RouteCSSTransitionGroup>
    </div>
  }
})

var routes = <Route path="/" component={App}>
  <IndexRoute component={require('./Page1')}/>
  <Route path="page1" component={require('./Page1')}/>
  <Route path="page2" component={require('./Page2')}/>
  <Route path="page3" component={require('./Page3')}/>
</Route>

var history = require('history/lib/createHashHistory')({queryKey: false})

render(<Router history={history} routes={routes}/>, document.querySelector('#example'))
