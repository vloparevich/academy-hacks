import "./App.css";
import React from "react";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import TutorDetails from "./components/TutorDetails/TutorDetails";
// import NavBar from "./components/NavBar/NavBar";
import Signup from "./components/Auth/Signup";
import authService from "./services/auth-service";
import { Switch, Route } from "react-router-dom";

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

  render = () => {
    return (
      <div className="App">
        {/* <NavBar user={this.state.user} loading={this.state.loading} /> */}
        <Switch>
          <Route
            exact
            path="/auth/signup"
            render={(props) => <Signup {...props} />}
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/user" component={Profile} />
          <Route exact path="/tutor/:id" component={TutorDetails} />
        </Switch>
      </div>
    );
  };
}

export default App;
