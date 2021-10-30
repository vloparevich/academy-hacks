import './App.css';
// import Timeslot from './components/Timeslot/Timeslot';
import React from 'react';
import Profile from './components/Profile';
import Home from './components/Home';
import { Switch, Route } from 'react-router-dom';
import Timeslot from './components/Timeslot/Timeslot';

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
        <Timeslot getTime={this.updateAvailAbility} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={Profile} />
        </Switch>
      </div>
    );
  };
}

export default App;
