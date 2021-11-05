import "./App.css";
import React from "react";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import TutorDetails from "./components/TutorDetails/TutorDetails";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import NormalRoute from "./routing-components/NormalRoute";
import authService from "./services/auth-service";
import * as PATHS from "./utils/paths";
import { Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  state = {
    user: null,
    loading: true,
  };

  componentDidMount() {
    authService.getSession().then((data) => {
      // console.log(data);
      const { user } = data;
      this.setState({
        user,
        loading: false,
      });
    });
  }

  updateAvailAbility = (slots) => {
    console.log("incoming slot", slots);
    this.setState({ slots }, () => {
      console.log("app state", this.state);
    });
  };

  authenticate = (user) => {
    this.setState({
      user,
    });
  };

  render = () => {
    return (
      <div className="App">
        <Navbar user={this.state.user} loading={this.state.loading} />
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
