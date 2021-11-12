import React, { Component } from "react";
import "./TutorRow.css";
import countries from "../../resources/countries.json";
// import User from "../"
import axios from "axios";
// import PROFILE_SERVICE from "../../services/ProfileServices";

export default class TutorRow extends Component {
  state = {
    coursesTaught: "",
  };

  componentsDidMount() {
    console.log("from the props in did mount", this.props.user._id);
    this.setState(
      {
        user: this.props.user,
      },
      () => {
        console.log("from state", this.state);
        this.getUser();
      }
    );
  }

  getUser = () => {
    console.log("calling getUser");
    console.log("in the getUser", this.state);
    axios
      .get(`http://localhost:5000/api/user/${this.state.user._id}`)
      .then((dataFromDb) => {
        console.log("this is coming from BE", dataFromDb.data);
        const { user } = dataFromDb.data;
        console.log({ user: user });
        this.setState({
          courseName: user.coursesTaught?.courses[0].courseName,
          description: user.coursesTaught?.courses[0].description,
        });
      });
  };

  render() {
    const { tutor } = this.props;

    const nationalFlag = countries.find(
      (country) => country.name.common === tutor.countryOfOrigin
    )?.flag;
    console.log(nationalFlag);
    return (
      <div className="tutor-row">
        <div className="SearchCardAvatarWrapper">
          <img
            className="RowProfilePicture"
            src={tutor.profilePic}
            alt="tutor-small-img"
          />
        </div>
        <div className="TutorDescriptionBlock">
          <div className="TutorShortDetails">
            <div className="TutorName">
              {tutor.firstName} {tutor.lastName[0]?.toUpperCase()}.
              <p>
                <span>
                  {/* hi {tutor.courseName} {tutor.description} */}
                  {this.state.coursesTaught}
                </span>
              </p>
            </div>
            <div className="CountryOfOrigin">
              <p>
                <span>{tutor.countryOfOrigin}</span>
                <span> {nationalFlag}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="SearchCardActions">
          <div className="TutorReviews">5 Stars</div>
        </div>
      </div>
    );
  }
}
