import './App.css';
import React from 'react';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
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
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={Profile} />
        </Switch>
      </div>
    );
  };
}

export default App;
