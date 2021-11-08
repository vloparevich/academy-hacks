import React, { Component } from "react";
import "./TutorRow.css";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

export default class TutorRow extends Component {
  render() {
    const { tutor } = this.props;
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
            </div>
            <div className="countryName">{tutor.countryOfOrigin}</div>
            {/* <div className="TutorReviews">5 Stars</div> */}
          </div>
        </div>

        <div className="SearchCardActions">
          <div className="TutorReviews">5 Stars</div>
        </div>
      </div>
    );
  }
}
