import React, { Component } from "react";
import "./TutorRow.css";
import countries from "../../resources/countries.json";

export default class TutorRow extends Component {
  render() {
    const { tutor } = this.props;
    const nationalFlag = countries.find(
      (country) => country.name.common === tutor.countryOfOrigin
    ).flag;
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
