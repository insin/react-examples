require('./LoadingButton.css')

var React = require('react')
var Button = require('react-bootstrap/lib/Button')

var Loading = require('./Loading')

var LoadingButton = React.createClass({
  propTypes: {
    label: React.PropTypes.string.isRequired,
    loading: React.PropTypes.bool.isRequired,
    icon: React.PropTypes.string,
    // Defaults to label + 'ing' if not provided
    loadingLabel: React.PropTypes.string
  },
  render() {
    var {icon, label, loading, loadingLabel, ...props} = this.props
    if (!loadingLabel) {
      loadingLabel = `${label}ing`
    }
    return <Button disabled={loading} {...props}>
      {loading
        ? <span><Loading inline delay={false}/> {icon && <img src={icon} className="LoadingButton__icon"/>} {loadingLabel}&hellip;</span>
        : <span>{icon && <img src={icon} className="LoadingButton__icon"/>} {label}</span>
      }
    </Button>
  }
})

module.exports = LoadingButton
