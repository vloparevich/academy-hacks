import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingComponent from './components/Loading';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import LogIn from './pages/LogIn';
import ProtectedPage from './pages/ProtectedPage';
import Signup from './pages/Signup';
import NormalRoute from './routing-components/NormalRoute';
import ProtectedRoute from './routing-components/ProtectedRoute';
import { getLoggedIn, logout } from './services/auth';
import * as PATHS from './utils/paths';
import * as CONSTS from './utils/consts';
// import * as USER_HELPERS from './utils/userToken';
import './App.css';
import Profile from './components/Profile/Profile';
import Home from './components/Home/Home';
import TutorDetails from './components/TutorDetails/TutorDetails';

// import Login from './components/Auth/Login';
// import { logout, getLoggedIn } from './services/auth-service';
// import * as PATHS from './utils/paths';
import * as USER_HELPERS from './utils/userToken';
// import { Switch, Route, Redirect } from 'react-router-dom';
import "./App.css";
// import authService from "./services/auth-service";
import ReviewTutor from "./components/ReviewTutor/ReviewTutor";

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
    this.setState({
      user,
    });
  };

  render() {
    if (this.state.isLoading) {
      return <LoadingComponent />;
    }

    return (
      <div className='App'>
        <Navbar handleLogout={this.handleLogout} user={this.state.user} />
        <Switch>
          <NormalRoute exact path={PATHS.HOMEPAGE} component={HomePage} />
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
            component={LogIn}
          />
          <ProtectedRoute
            exact
            path={PATHS.PROTECTEDPAGE}
            component={ProtectedPage}
            user={this.state.user}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={Profile} />
          <Route exact path="/tutor/:id" component={TutorDetails} />
          <Route exact path="/tutor/review/:id" component={ReviewTutor} />
        </Switch>
      </div>
    );
  }
}

export default App;
