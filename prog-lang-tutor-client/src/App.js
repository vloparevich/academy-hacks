import "./App.css";
import React from "react";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import TutorDetails from "./components/TutorDetails/TutorDetails";
import Navbar from "./components/Navbar/Navbar";
import Signup from "./components/Auth/Signup";
import { Switch, Route } from "react-router-dom";

class App extends React.Component {
  state = {};

  updateAvailAbility = (slots) => {
    console.log("incoming slot", slots);
    this.setState({ slots }, () => {
      console.log("app state", this.state);
    });
  };

  render = () => {
    return (
      <div className="App">
        <Navbar></Navbar>
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
