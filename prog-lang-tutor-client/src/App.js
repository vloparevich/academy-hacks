import './App.css';
<<<<<<< HEAD
// import Timeslot from './components/Timeslot/Timeslot';
import React from 'react';
import Profile from './components/Profile';
import Home from './components/Home';
=======
import React from 'react';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
>>>>>>> 44b296c2a0deca551d2fcd5fd5324205b255da23
import { Switch, Route } from 'react-router-dom'

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
        <Navbar></Navbar>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={Profile} />
        </Switch>
      </div>
    );
  };
}

export default App;
