var React = require('react')
var {connect} = require('react-redux')

var {load} = require('../ducks/admin')

var mapStateToProps = state => state.admin

var Admin = React.createClass({
  componentDidMount() {
    this.props.dispatch(load())
  },
  render() {
    var {loading, message} = this.props
    return <div className="Admin">
      <h2>Admin</h2>
      <p>This screen was loaded via a chunk.</p>
      <p>{message}</p>
      {loading && <p>Doing some fake loading&hellip;</p>}
    </div>
  }
})

module.exports = connect(mapStateToProps)(Admin)
