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
    timeSlots: [],
  };

  handleTimePickerChange = (position) => {
    const timeSlots = this.state.timeSlots;
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
      timeSlots: timeSlots,
    });
  };

  createTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
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

  onChange = (event) => {
    const shortDateValue = moment(event).format('MM/DD/YYYY');
    this.setState(
      {
        calendarValueLong: event,
        calendarValueShort: shortDateValue,
      },
      () => {
        console.log('short date format', this.state.calendarValueShort);
      }
    );
  };

  handlePickedSlotsAndDate = () => {
    this.props.getTime(this.state);
  };

  render() {
    return (
      <div id='scheduler'>
        <Calendar
          onChange={(event) => this.onChange(event)}
          value={this.state.calendarValueLong}
          minDate={new Date(this.currentDate.toUTCString())}
        />
        {this.createTimeSlots().map((current) => current)}
        <button onClick={this.handlePickedSlotsAndDate}>Save</button>
      </div>
    );
  }
}
