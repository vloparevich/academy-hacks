import logo from './logo.svg';
import './App.css';
import Timeslot from './components/Timeslot/Timeslot';
import React from 'react';

class App extends React.Component {
  state = {};

  updateAvailAbility = (slots) => {
    console.log('incoming slot', slots);
    this.setState({ slots }, () => {
      console.log('app state', this.state);
    });
  };

  render = () => {
    return (
      <div className='App'>
        <div id='schedulers'>
          <Timeslot getTime={this.updateAvailAbility} day={'MON'} />
        </div>
      </div>
    );
  };
}

export default App;
