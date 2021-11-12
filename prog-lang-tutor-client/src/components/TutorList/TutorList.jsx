/////////////////////////////////////////////////////////
import React, { Component } from "react";
import "./TutorList.css";
import USER_SERVICE from "../../services/UserServices";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";

class TutorList extends Component {
  state = {
    filteredTutors: [],
    tutorsFromApi: [],
    showing: true,
  };

  fetchTutors = () => {
    USER_SERVICE.getAllTutors()
      .then((tutors) => {
        this.setState({ tutorsFromApi: tutors });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.fetchTutors();
  };

  handleCategoryClick = () => {
    this.setState({
      isCategoryShown: !this.state.isCategoryShown,
    });
  };

  render() {
    const { showing } = this.state;
    console.log(this.state.tutorsFromApi[0]);
    return (
      <div>
        <Navbar user={this.state.user} loading={this.state.loading} />
        <h1>Courses</h1>
        <div>
          <button onClick={() => this.setState({ showing: !showing })}>
            All
          </button>

          <button>Java</button>
          <button>JavaScript</button>
        </div>

        <div>
          {this.state.tutorsFromApi.map((tutorInfo) => (
            <>
              <div style={{ display: showing ? "block" : "none" }}>
                <img
                  className="tutorListPic"
                  src={tutorInfo.profilePic}
                  alt="profile"
                ></img>
                {/* <h1>{tutorInfo.description}</h1> */}
                <p>
                  {tutorInfo.firstName} {tutorInfo.lastName}{" "}
                </p>
                <p>{tutorInfo.coursesTaught}</p>
              </div>
              {/* <h3>
                {" "}
                {tutorInfo.coursesTaught} : {tutorInfo.description}
              </h3> */}
            </>
          ))}
        </div>

        <footer>
          Academy Hacks, we put you in control of your lessons© 2021.
          HackAcademy.com
        </footer>
      </div>
    );
  }
}

export default TutorList;
