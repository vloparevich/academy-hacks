import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Timeslot.css';

export default class Timeslot extends Component {
  state = {
    isTimeSlotChecked: new Array(24).fill(false),
    timeSlots: [],
    calendarValue: new Date(),
  };

  handleChange = (position) => {
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
    this.setState(
      {
        isTimeSlotChecked: updatedCheckedState,
        timeSlots: timeSlots,
      },
      () => {
        this.props.getTime(this.state);
      }
    );
  };

  createTimeSlots = () => {
    const slots = [];
    for (let i = 0; i < 24; i++) {
      slots.push(
        <div key={i}>
          <button
            name={i}
            onClick={() => this.handleChange(i)}
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
    this.setState({ calendarValue: event });
  };

  render() {
    return (
      <div id='scheduler'>
        <Calendar
          onChange={(event) => this.onChange(event)}
          value={this.state.calendarValue}
          minDate={new Date()}
        />
        {this.createTimeSlots().map((current) => current)}
      </div>
    );
  }
}
