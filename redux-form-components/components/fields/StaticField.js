var React = require('react')

var FormField = require('./FormField')

var StaticField = React.createClass({
  shouldComponentUpdate(nextProps) {
    return (this.props.label !== nextProps.label ||
            this.props.value !== nextProps.value)
  },
  render() {
    var {label, value} = this.props
    return <FormField inputClass="form-control-static" label={label}>{value}</FormField>
  }
})

module.exports = StaticField
