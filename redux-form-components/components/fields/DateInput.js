var React = require('react')
var {PropTypes} = React
var DateTimePicker = require('react-widgets/lib/DateTimePicker')

var FormField = require('./FormField')

var DateInput = React.createClass({
  propTypes: {
    field: PropTypes.object.isRequired
  },
  shouldComponentUpdate: FormField.shouldFormFieldUpdate,
  render() {
    var {field, help, label, afterChange, ...inputProps} = this.props
    var onChange = field.onChange
    if (afterChange) {
      onChange = function(...args) {
        field.onChange(...args)
        afterChange(...args)
      }
    }
    return <FormField field={field} help={help} inputProps={inputProps} label={label}>
      <DateTimePicker
        {...inputProps}
        format="dd/MM/yyyy"
        name={field.name}
        onChange={onChange}
        time={false}
        value={field.value}
      />
    </FormField>
  }
})

module.exports = DateInput
