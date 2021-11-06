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
          {/* <div className="TutorShortDetails">
            <Card border="primary" style={{ width: "18rem" }}>
              <Card.Body className="TutorName">
                <div className="SearchCardAvatarWrapper">
                  <Card.Img
                    className="RowProfilePicture"
                    src={tutor.profilePic}
                    alt="tutor-small-img"
                  />
                </div>
                <Card.Title>
                  {" "}
                  {tutor.firstName} {tutor.lastName[0].toUpperCase()}
                </Card.Title>
                <Card.Text>
                  {tutor.countryOfOrigin}
                  <div className="SearchCardActions"></div>5 Stars
                </Card.Text>

                <Button variant="secondary">Book Lesson</Button>
              </Card.Body>
            </Card> */}
        </div>
        <div className="TutorShortDetails">
          <div className="TutorName">
            <div className="NameTutor">
              {tutor.firstName} {tutor.lastName[0].toUpperCase()}
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
