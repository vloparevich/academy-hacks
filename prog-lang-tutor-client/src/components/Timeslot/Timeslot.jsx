import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Timeslot.css';
import moment from 'moment';

export default class Timeslot extends Component {
  currentDate = new Date();

  state = {
    isTimeSlotChecked: new Array(24).fill(false),
    calendarValueLong: new Date(),
    calendarValueShort: '',
    pickedTimeSlots: [],
    from: 0,
    to: 0,
  };

  componentDidMount = () => {
    const { timeRange } = this.props;
    this.setState({
      from: timeRange.from,
      to: timeRange.to,
    });
  };

  handleTimePickerChange = (position) => {
    const timeSlots = this.state.pickedTimeSlots;
    const updatedCheckedState = this.state.isTimeSlotChecked.map(
      (item, index) => {
        if (index === position) {
          item
            ? timeSlots.splice(timeSlots.indexOf(index), 1)
            : timeSlots.push(index);
          return !item;
        }
        return item;
      }
    );
    this.setState({
      isTimeSlotChecked: updatedCheckedState,
      pickedTimeSlots: timeSlots.sort((a, b) => a - b),
    });
  };

  createTimeSlots = () => {
    const slots = [];
    for (let i = this.state.from; i < this.state.to; i++) {
      slots.push(
        <div key={i}>
          <button
            name={i}
            onClick={() => this.handleTimePickerChange(i)}
            style={{
              backgroundColor: this.state.isTimeSlotChecked[i]
                ? '#01FF70'
                : '#39CCCC',
            }}
          >
            {i}:00-{i + 1}:00
          </button>
        </div>
      );
    }
    return slots;
  };

  onDateChange = (event) => {
    const shortDateValue = moment(event).format('MM/DD/YYYY');
    this.setState({
      calendarValueLong: event,
      calendarValueShort: shortDateValue,
    });
  };

  handlePickedSlotsAndDate = () => {
    console.log('time slot state', {
      pickedTimeSlot: this.state.pickedTimeSlot,
      calendarValueShort: this.state.calendarValueShort,
    });
    // this.props.getTime(this.state);
    //After the state is sent to the route to be stored in the DB resetting the state
    this.setState({
      isTimeSlotChecked: new Array(24).fill(false),
      calendarValueLong: new Date(),
      calendarValueShort: '',
      pickedTimeSlots: [],
    });
  };

  render() {
    return (
      <div id='scheduler'>
        <Calendar
          onChange={(event) => this.onDateChange(event)}
          value={this.state.calendarValueLong}
          minDate={new Date(this.currentDate.toUTCString())}
        />
        {this.createTimeSlots().map((current) => current)}
        <button onClick={this.handlePickedSlotsAndDate} class='SaveTimeButton'>
          Save
        </button>
      </div>
    );
  }
}
