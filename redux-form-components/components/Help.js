require('./Help.css')

var Glyphicon = require('react-bootstrap/lib/Glyphicon')
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger')
var React = require('react')
var Tooltip = require('react-bootstrap/lib/Tooltip')

var Help = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired
  },
  render() {
    var tooltip = <Tooltip>{this.props.text}</Tooltip>
    return <OverlayTrigger overlay={tooltip} delayShow={300} delayHide={150}>
      <Glyphicon className="Help" glyph="question-sign"/>
    </OverlayTrigger>
  }
})

module.exports = Help
