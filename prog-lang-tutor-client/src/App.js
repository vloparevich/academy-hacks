import "./App.css";
import React from "react";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar/Navbar";
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
        </Switch>
      </div>
    );
  };
}

export default App;
