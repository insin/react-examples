var React = require('react')
var {connect} = require('react-redux')
var {Link} = require('react-router')

var mapStateToProps = state => state.auth

var App = React.createClass({
  render() {
    return <div className="App">
      <h1>App</h1>
      {this.props.message}
      <ul>
        <li><Link to="/search">Search</Link></li>
        <li><Link to="/admin">Admin</Link> (loaded on demand)</li>
      </ul>
      {this.props.children}
    </div>
  }
})

module.exports = connect(mapStateToProps)(App)
