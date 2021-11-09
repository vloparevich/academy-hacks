// import React, { Component } from "react";
// import Navbar from "../Navbar/Navbar";
// import axios from "axios";
// import TutorDetails from "../TutorDetails/TutorDetails";

// export default class TutorList extends Component {
//   // state = {
//   //   coursesTaught: "",
//   // };
//   state = {
//     coursesTaught: "",
//   };

//   componentsDidMount() {
//     console.log("from the props in did mount", this.props.user._id);
//     this.setState(
//       {
//         user: this.props.user,
//       },
//       () => {
//         console.log("from state", this.state);
//         this.getUser();
//       }
//     );
//   }

//   getUser = () => {
//     console.log("calling getUser");
//     console.log("in the getUser", this.state);
//     axios
//       .get(`http://localhost:5000/api/user/${this.state.user._id}`)
//       .then((dataFromDb) => {
//         console.log("this is coming from BE", dataFromDb.data);
//         const { user } = dataFromDb.data;
//         console.log({ user: user });
//         this.setState({
//           courseName: user.coursesTaught?.courses[0].courseName,
//           description: user.coursesTaught?.courses[0].description,
//         });
//       });
//   };
//   render() {
//     // const { isTutor } = this.props;
//     const { tutor } = this.props;
//     return (
//       <div>
//         <Navbar />
//         <TutorDetails />
//         <div>hi{tutor.courseName}</div>

//         <div className="work">hello</div>
//       </div>
//     );
//   }
// }
import React, { Component } from "react";
import "./TutorList.css";

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

    return (
      <div className="list-tutor">
        <div className="SearchCardAvatarWrappers">
          <img
            className="RowProfilePictures"
            src={tutor.profilePic}
            alt="tutor-small-imgs"
          />
        </div>
        <div className="TutorDescriptionBlocks">
          <div className="TutorShortDetail">
            <div className="TutorNames">
              {/* {tutor.firstName} {tutor.lastName[0]?.toUpperCase()}. */}
              <p>
                <span>
                  {/* hi {tutor.courseName} {tutor.description} */}
                  {this.state.coursesTaught}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="SearchCardAction">
          <div className="TutorReview">5 Stars</div>
        </div>
      </div>
    );
  }
}
