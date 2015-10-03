var React = require('react')

var FormField = require('./FormField')

var TextInput = React.createClass({
  propTypes: {
    field: React.PropTypes.object.isRequired
  },
  shouldComponentUpdate: FormField.shouldFormFieldUpdate,
  render() {
    var {field, help, label, onChange, ...inputProps} = this.props
    return <FormField field={field} help={help} inputProps={inputProps} label={label}>
      <input
        {...inputProps}
        className="form-control"
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChange && field.onChange}
      />
    </FormField>
  }
})

module.exports = TextInput
