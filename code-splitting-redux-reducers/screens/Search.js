var React = require('react')
var {connect} = require('react-redux')

var mapStateToProps = state => state.search

var Search = React.createClass({
  render() {
    return <div className="Search">
      <h1>Search</h1>
      <p>This screen was part of the entry bundle.</p>
      <p>{this.props.message}</p>
    </div>
  }
})

module.exports = connect(mapStateToProps)(Search)
