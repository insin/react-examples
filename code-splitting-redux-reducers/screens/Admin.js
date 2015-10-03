var React = require('react')
var {connect} = require('react-redux')

var mapStateToProps = state => state.admin

var Admin = React.createClass({
  render() {
    return <div className="Admin">
      <h1>Admin</h1>
      <p>This screen was loaded via code splitting.</p>
      <p>{this.props.message}</p>
    </div>
  }
})

module.exports = connect(mapStateToProps)(Admin)
