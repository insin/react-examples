var Col = require('react-bootstrap/lib/Col')
var PageHeader = require('react-bootstrap/lib/PageHeader')
var React = require('react')
var Row = require('react-bootstrap/lib/Row')
var {connect} = require('react-redux')
var {reduxForm} = require('redux-form')

var DateInput = require('./fields/DateInput')
var FormField = require('./fields/FormField')
var LoadingButton = require('./LoadingButton')
var StaticField = require('./fields/StaticField')
var TextInput = require('./fields/TextInput')

var {zeroTime} = require('../utils')

var TODAY = zeroTime(new Date())

var mapStateToProps = (state) => state

var form = reduxForm({
  form: 'addTravel',
  fields: ['startDate', 'endDate', 'origin', 'destination', 'hotel', 'hasCar'],
  touchOnChange: true, // react-widgets DateTimePicker doesn't blur
  validate(travel) {
    var errors = {}
    if (!travel.startDate) errors.startDate = 'Please enter a start date.'
    if (!travel.endDate) errors.endDate = 'Please enter an end date.'
    if (travel.startDate && travel.endDate &&
        zeroTime(travel.endDate) < zeroTime(travel.startDate)) {
      errors.endDate = 'End date must not be earlier than start date.'
    }
    if (!travel.origin) errors.origin = 'Please enter an origin.'
    if (!travel.destination) errors.destination = 'Please enter a destination.'
    return errors
  }
})

var AddTravel = React.createClass({
  getInitialState() {
    return {
      fakeSaving: false,
      fakeSubmitted: null
    }
  },
  componentWillMount() {
    this.props.initializeForm({
      startDate: null,
      endDate: null,
      origin: '',
      destination: '',
      hotel: '',
      hasCar: 'no'
    })
  },

  /**
   * Set endDate to startDate if it's blank or would otherwise be invalid.
   */
  handleStartDateChange(startDate) {
    var {endDate} = this.props.fields
    if (endDate.value == null || endDate.value < startDate) {
      endDate.onChange(startDate)
    }
  },
  handleSubmit(data) {
    this.setState({fakeSaving: true, fakeSubmitted: data})
    setTimeout(() => this.setState({fakeSaving: false}), 2000)
  },

  render() {
    var {fields} = this.props
    var {fakeSaving, fakeSubmitted} = this.state
    return <div className="container">
      <PageHeader>redux-form example</PageHeader>
      <form className="form-horizontal" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <Row>
          <StaticField label="First Name:" value="Steve"/>
          <StaticField label="Last Name:" value="Test"/>
        </Row>
        <Row>
          <DateInput
            afterChange={this.handleStartDateChange}
            disabled={fakeSaving}
            field={fields.startDate}
            id="startDate"
            label="Start Date:"
            min={TODAY}
          />
          <DateInput
            disabled={fakeSaving}
            field={fields.endDate}
            id="endDate"
            label="End Date:"
            min={fields.startDate.value || TODAY}
          />
        </Row>
        <Row>
          <TextInput
            disabled={fakeSaving}
            field={fields.origin}
            id="origin"
            label="Origin:"
          />
          <TextInput
            disabled={fakeSaving}
            field={fields.destination}
            label="Destination:"
            id="destination"
          />
        </Row>
        <Row>
          <TextInput
            disabled={fakeSaving}
            field={fields.hotel}
            help="Please enter name of hotel here. If no hotel booking exists or unknown put 'N/A'"
            id="hotel"
            label="Hotel:"
          />
          <FormField help="Please select 'Yes' if access to a car (rented or personal) during travel and 'No' if no access to a car during travel" label="Car:">
            <label className="radio-inline">
              <input type="radio" name="hasCar" value="yes" onChange={fields.hasCar.onChange} disabled={fakeSaving}/> Yes
            </label>
            <label className="radio-inline">
              <input type="radio" name="hasCar" value="no" onChange={fields.hasCar.onChange} defaultChecked disabled={fakeSaving}/> No
            </label>
          </FormField>
        </Row>
        <Row className="form-group">
          <Col sm={12} className="text-center">
            <LoadingButton
              bsSize="large"
              bsStyle="primary"
              label="Add Travel"
              loading={fakeSaving}
              loadingLabel="Adding Travel"
              type="submit"
            />
          </Col>
        </Row>
        {fakeSubmitted && <pre><code>{JSON.stringify(fakeSubmitted, null, 2)}</code></pre>}
      </form>
    </div>
  }
})

module.exports = connect(mapStateToProps)(form(AddTravel))
