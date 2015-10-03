require('./Loading.css')

var classNames = require('classnames')
var Glyphicon = require('react-bootstrap/lib/Glyphicon')
var React = require('react')

var Loading = React.createClass({
  propTypes: {
    delay: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.number
    ]),
    inline: React.PropTypes.bool,
    text: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      delay: 500,
      inline: false
    }
  },
  getInitialState() {
    return {
      delaying: !!this.props.delay
    }
  },
  componentDidMount() {
    if (this.props.delay) {
      this.timeout = setTimeout(this.handleDisplay, this.props.delay)
    }
  },
  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
  },

  handleDisplay() {
    this.timeout = null
    this.setState({delaying: false})
  },

  render() {
    var {delay, inline, text} = this.props
    var {delaying} = this.state
    var className = classNames('Loading', {
      'Loading--delaying': delaying,
      'Loading--displaying': delay && !delaying,
      'Loading--inline': inline
    })
    return <div className={className}>
      <Glyphicon glyph="refresh"/>
      {text && <div className="Loading__text">{text}&hellip;</div>}
    </div>
  }
})

module.exports = Loading
