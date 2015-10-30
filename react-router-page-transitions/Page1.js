var React = require('react')
var Content = require('./Content')

var Page1 = React.createClass({
  render() {
    return <div className="Page1">
      Page 1
      <Content/>
    </div>
  }
})

module.exports = Page1
