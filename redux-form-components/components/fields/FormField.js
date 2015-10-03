var classNames = require('classnames')
var Col = require('react-bootstrap/lib/Col')
var React = require('react')
var Row = require('react-bootstrap/lib/Row')

var Help = require('../Help')
var Loading = require('../Loading')

var FIELD_EVENT_HANDLER = /^(?:on|handle)[A-Z]/

/**
 * Perform shallow equals comparison of two redux-form field objects to
 * determine if the field has changed.
 */
function fieldShallowEquals(field, nextField) {
  for (var prop in field) {
    // Ignore event handlers, as they continually get recreated by redux-form
    if (!FIELD_EVENT_HANDLER.test(prop) && field[prop] !== nextField[prop]) {
      return false
    }
  }
  return true
}

/**
 * Perform shallow equals comparison to determine if the props of the context
 * form field component have changed, with special-case handling for the "field"
 * prop, provided by redux-form.
 * Use this as shouldComponentUpdate() on components which compose a
 * FormField in their render() method and they will only re-render when
 * necessary.
 */
function shouldFormFieldUpdate(nextProps) {
  var keys = Object.keys(this.props)
  var nextKeys = Object.keys(nextProps)
  if (keys.length !== nextKeys.length) return true
  var nextHasOwnProperty = Object.prototype.hasOwnProperty.bind(nextProps)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    if (!nextHasOwnProperty(key) ||
        key === 'field' ? !fieldShallowEquals(this.props[key], nextProps[key])
                        : this.props[key] !== nextProps[key]) {
      return true
    }
  }
  return false
}

/**
 * A form field in a Bootstrap 3 two column layout.
 *
 * This component manages:
 * - Bootstrap structure and classes
 * - A loading indicator
 * - A <Label> for the field
 * - Label help text
 * - Validation error style and display
 *
 * The form input itself should be passed as content.
 */
var FormField = React.createClass({
  statics: {
    shouldFormFieldUpdate
  },
  propTypes: {
    // A redux-form field object
    field: React.PropTypes.object,
    // Help text to be displayed next to the label
    help: React.PropTypes.string,
    // An additional class to be applied to the input container
    inputClass: React.PropTypes.string,
    // Props used for the input (id is used to link the label to the input)
    inputProps: React.PropTypes.object,
    // Label text
    label: React.PropTypes.string,
    // Loading state
    loading: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      field: {},
      inputProps: {}
    }
  },
  render() {
    var {field, help, inputClass, inputProps, label, loading} = this.props
    var error = field.touched && field.error
    return <Col sm={6}>
      <Row className={classNames('form-group', {'has-error': error})}>
        <Col sm={4} className="control-label">
          {loading && <Loading inline/>} <label htmlFor={inputProps.id}>{label}</label>
          {help && <Help text={help}/>}
        </Col>
        <Col sm={8} className={inputClass}>
          {this.props.children}
          {error && <p className="help-block" style={{marginBottom: 0}}>{error}</p>}
        </Col>
      </Row>
    </Col>
  }
})

module.exports = FormField
