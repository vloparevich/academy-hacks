import "./App.css";
import React from "react";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import TutorDetails from "./components/TutorDetails/TutorDetails";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import NormalRoute from "./routing-components/NormalRoute";
import { logout, getLoggedIn } from "./services/auth-service";
import * as PATHS from "./utils/paths";
import * as USER_HELPERS from "./utils/userToken";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    user: null,
    loading: false,
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
        console.log("RES IN CASE OF FAILURE", res);
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

  //   getLoggedIn(accessToken).then((res) => {
  //     if (!res.status) {
  //       console.log("RES IN CASE OF FAILURE", res);
  //       // deal with failed backend call
  //       return this.setState({
  //         isLoading: false,
  //       });
  //     }
  //     this.setState({
  //       user: res.data.user,
  //       isLoading: false,
  //     });
  //   });
  // };

  updateAvailAbility = (slots) => {
    console.log("incoming slot", slots);
    this.setState({ slots }, () => {
      console.log("app state", this.state);
    });
  };

  handleLogout = () => {
    const accessToken = USER_HELPERS.getUserToken();
    console.log({ token: accessToken });
    if (!accessToken) {
      console.log({ accessToken: accessToken });
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
            console.error("💡 SOMETHING HAPPENED THAT HAS TO DEALT WITH", res);
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

  render = () => {
    return (
      <div className="App">
        <Navbar
          user={this.state.user}
          handleLogout={this.handleLogout}
          loading={this.state.loading}
        />
        <Switch>
          <Route
            exact
            path="/auth/signup"
            render={(props) => <Signup {...props} />}
          />
          <NormalRoute
            exact
            path={PATHS.LOGINPAGE}
            authenticate={this.authenticate}
            component={Login}
          />
          <Route exact path="/" component={Home} />
          {/* {this.state.user ? (
            <Route exact path="/user" component={Profile} />
          ) : (
            <Redirect to="/auth/signup" />
          )} */}
          <Route exact path="/tutor/:id" component={TutorDetails} />
        </Switch>
      </div>
    );
  };
}

export default App;
