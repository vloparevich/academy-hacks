import './App.css';
import React from 'react';
import { Switch } from 'react-router-dom';
import NormalRoute from './routing-components/NormalRoute';
import { getLoggedIn, logout } from './services/auth';
import LoadingComponent from './components/Loading';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './routing-components/ProtectedRoute';
import TutorProfile from './components/Profile/TutorProfile';
import StudentProfile from './components/Profile/StudentProfile';
import TutorDetails from './components/TutorDetails/TutorDetails';
import ReviewTutor from './components/ReviewTutor/ReviewTutor';
import MyLessons from './components/MyLessons/MyLessons';
import TutorList from './components/TutorList/TutorList';
import Footer from './components/Footer/Footer';
import * as USER_HELPERS from './utils/userToken';
import * as PATHS from './utils/paths';

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
          <NormalRoute
            exact
            path={PATHS.TUTOR_DETAILS}
            authenticate={this.authenticate}
            component={TutorDetails}
            user={this.state.user}
          />
          <NormalRoute
            exact
            path={PATHS.TUTOR_REVIEW}
            authenticate={this.authenticate}
            component={ReviewTutor}
          />
          <NormalRoute
            exact
            path={PATHS.TUTOR_LIST}
            component={TutorList}
            user={this.state.user}
          />
          <ProtectedRoute
            exact
            path={PATHS.USER_DETAILS}
            component={this.state.user?.isTutor ? TutorProfile : StudentProfile}
            user={this.state.user}
          />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
