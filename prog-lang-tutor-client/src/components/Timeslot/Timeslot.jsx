import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Timeslot.css';
import moment from 'moment';
import BOOKING_SERVICE from '../../services/BookingServices';

export default class Timeslot extends Component {
  currentDate = new Date();

  state = {
    isTimeSlotChecked: new Array(24).fill(false),
    alreadyBookedSlots: [],
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
      if (this.state.alreadyBookedSlots.includes(i)) continue;
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

  onCalendarDateChange = (event) => {
    const shortDateValue = moment(event).format('MM/DD/YYYY');
    BOOKING_SERVICE.getMyScheduleForThisDay(shortDateValue, this.props.tutorId)
      .then((responseFromApi) => {
        console.log('FRONT END just hit the backend', responseFromApi.data);

        let singleDayBookings = [];
        responseFromApi.data.thisDateWithBookings &&
          (singleDayBookings =
            responseFromApi.data.thisDateWithBookings?.bookedSlots[0]
              .bookedTime);

        this.setState(
          {
            alreadyBookedSlots: singleDayBookings,
          },
          () => console.log(this.state.alreadyBookedSlots)
        );
      })
      .catch((err) => console.log(err));

    this.setState({
      calendarValueLong: event,
      calendarValueShort: shortDateValue,
    });
  };

  handlePickedSlotsAndDate = () => {
    console.log('time slot state', {
      pickedTimeSlots: this.state.pickedTimeSlots,
      calendarValueShort: this.state.calendarValueShort,
    });
    // !!! check on empty calendar date 'calendarValueShort'

    this.props.bookedTime(this.state);
    //After the state is sent to the route to be stored in the DB resetting the state

    this.setState({
      isTimeSlotChecked: new Array(24).fill(false),
      // calendarValueLong: new Date(),
      calendarValueShort: '',
      pickedTimeSlots: [],
    });
  };

  render() {
    return (
      <div id='schedulerComponent'>
        <div id='scheduler'>
          <Calendar
            onChange={(event) => this.onCalendarDateChange(event)}
            value={this.state.calendarValueLong}
            minDate={new Date(this.currentDate.toUTCString())}
          />
          <div className='timePicker'>
            {this.createTimeSlots().map((current) => current)}
          </div>
        </div>
        <div id='schedulerFooter'>
          {this.createTimeSlots().length !== 0 ? (
            <button
              onClick={this.handlePickedSlotsAndDate}
              className='SaveTimeButton'
            >
              Book
            </button>
          ) : (
            <div id='NoLessonsLeftBanner'>
              This date is sold, try a different one...
            </div>
          )}
        </div>
      </div>
    );
  }
}
