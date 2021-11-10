import React, { Component } from 'react';
import moment from 'moment';
import './Time.css';
export default class Time extends Component {
  state = {
    currentDate: moment().format('L'),
    currentTime: moment().format('H:mm:ss'),
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentDate: moment().format('L'),
        currentTime: moment().format('H:mm:ss'),
      });
    }, 1000);
  }

  render() {
    return (
      <div id='timeCmp'>
        {this.state.currentDate}
        <br />
        {this.state.currentTime}
      </div>
    );
  }
}
