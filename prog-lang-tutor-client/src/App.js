import React from 'react';
import { Switch } from 'react-router-dom';
import LoadingComponent from './components/Loading';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import NormalRoute from './routing-components/NormalRoute';
import ProtectedRoute from './routing-components/ProtectedRoute';
import { getLoggedIn, logout } from './services/auth';
import * as PATHS from './utils/paths';
import './App.css';
import Profile from './components/Profile/Profile';
import TutorDetails from './components/TutorDetails/TutorDetails';
import * as USER_HELPERS from './utils/userToken';
import './App.css';
import ReviewTutor from './components/ReviewTutor/ReviewTutor';

class App extends React.Component {
  state = {
    user: null,
    isLoading: true,
  };

  componentDidMount = () => {
    const accessToken = USER_HELPERS.getUserToken();
    if (!accessToken) {
      return this.setState({
        isLoading: false,
      });
    }
    getLoggedIn(accessToken).then((res) => {
      if (!res.status) {
        // deal with failed backend call
        return this.setState({
          isLoading: false,
        });
      }
      this.setState({
        user: res.data.user,
        isLoading: false,
      });
    });
  };

  handleLogout = () => {
    const accessToken = USER_HELPERS.getUserToken();
    console.log('hit logout', accessToken);
    if (!accessToken) {
      return this.setState({
        user: null,
        isLoading: false,
      });
    }
    this.setState(
      {
        isLoading: true,
      },
      () => {
        logout(accessToken).then((res) => {
          if (!res.status) {
            // deal with error here
            console.error('💡 SOMETHING HAPPENED THAT HAS TO DEALT WITH', res);
          }
          USER_HELPERS.removeUserToken();
          return this.setState({
            isLoading: false,
            user: null,
          });
        });
      }
    );
  };

  authenticate = (user) => {
    this.setState(
      {
        user,
      },
      () => console.log('User', this.state.user)
    );
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    console.log('in main app.js component', this.state.user);

    return (
      <div className='App'>
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <NormalRoute exact path={PATHS.HOMEPAGE} component={Home} />
          <NormalRoute
            exact
            path={PATHS.SIGNUPPAGE}
            authenticate={this.authenticate}
            component={Signup}
          />
          <NormalRoute
            exact
            path={PATHS.LOGINPAGE}
            authenticate={this.authenticate}
            component={Login}
          />
          <ProtectedRoute
            exact
            path={PATHS.USER_DETAILS}
            component={Profile}
            user={this.state.user}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
