import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';
import * as PATHS from '../../utils/paths.js';
import CountryFlag from '../CountryFlag/CountryFlag';

class StudentProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    profilePic: '',
    countryOfOrigin: '',
    teachingExperience: '',
    timeRangeOfAvailability: '',
    coursesTaught: '',
    isEditDetailsClicked: false,
    prevCourseName: '',
  };

  componentDidMount() {
    console.log('from the props in cdid mount', this.props.user._id);
    this.setState(
      {
        user: this.props.user,
      },
      () => {
        console.log('from state', this.state);
        this.getUser();
      }
    );
  }

  getUser = () => {
    console.log('calling getUser');
    console.log('in the getUser', this.state);
    axios
      .get(`http://localhost:5000/api/user/${this.state.user._id}`)
      .then((dataFromDb) => {
        const { user } = dataFromDb.data;
        console.log({ user: user });
        this.setState(
          {
            firstName: user.firstName,
            lastName: user.lastName,
            countryOfOrigin: user.countryOfOrigin,
            profilePic: user.profilePic,
            teachingExperience: user.teachingExperience,
            from: user.timeRangeOfAvailability?.from
              ? user.timeRangeOfAvailability?.from
              : '00',
            to: user.timeRangeOfAvailability?.to
              ? user.timeRangeOfAvailability?.to
              : '00',
            courseName: user.coursesTaught?.courses[0].courseName,
            description: user.coursesTaught?.courses[0].description,
            prevCourseName: user.coursesTaught?.courses[0].courseName,
          },
          () => console.log({ state: this.state })
        );
      });
  };

  getUserWithUpdatedProfilePicture = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('profilePic', file);
    PROFILE_SERVICE.handleUpload(uploadData, this.state.user._id).then(
      (responseFromApi) => {
        this.setState(
          {
            profilePic: responseFromApi.user,
          },
          () => {
            this.getUser();
          }
        );
      }
    );
  };

  handleRange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleEditButton = () => {
    this.setState({ isEditDetailsClicked: !this.state.isEditDetailsClicked });
  };

  handleFormInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    this.setState({ [name]: value });
  };

  handleSavingChanges = (event) => {
    event.preventDefault();
    PROFILE_SERVICE.handleUpdateTutorDetails(this.state).then(() => {
      this.setState(
        {
          isEditDetailsClicked: false,
        },
        () => {
          this.getUser();
        }
      );
    });
  };

  handleCancelOfUpdate = () => {
    this.setState(
      {
        isEditDetailsClicked: false,
      },
      () => this.getUser()
    );
  };

  render() {
    return (
      <>
        <div className='profileContainer'>
          <Link to={`/student/lessons/${this.state.user?._id}`}>
            Show my bookings
          </Link>
          <div className='imageSection'>
            {this.state.profilePic && (
              <img
                id='profilePicture'
                src={this.state.profilePic}
                alt='profile pic'
              />
            )}
            <label id='imageInputLabel'>
              Add/Update profile picture
              <input
                id='imageInput'
                type='file'
                name='profilePic'
                onChange={(event) =>
                  this.getUserWithUpdatedProfilePicture(event)
                }
                ref={(ref) => (this.fileInput = ref)}
              />
            </label>
          </div>
          <div className='userDetailsSection'>
            <div className='controlButtonsUserDetails'>
              {this.state.isEditDetailsClicked ? (
                <>
                  <form
                    onSubmit={(event) => this.handleSavingChanges(event)}
                    autoComplete='off'
                  >
                    <div>
                      <label>First name</label>
                      <input
                        autoFocus
                        name='firstName'
                        id='firstName'
                        value={this.state.firstName}
                        onChange={this.handleFormInput}
                      />
                      {!this.state.firstName && (
                        <span className='requiredField'>
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label>Last name</label>
                      <input
                        name='lastName'
                        id='lastName'
                        value={this.state.lastName}
                        onChange={this.handleFormInput}
                      />
                      {!this.state.lastName && (
                        <span className='requiredField'>
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label>Country</label>
                      <input
                        name='countryOfOrigin'
                        id='country'
                        value={this.state.countryOfOrigin}
                        onChange={this.handleFormInput}
                      />
                      {!this.state.countryOfOrigin && (
                        <span className='requiredField'>
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <label>Description (max 200 characters)</label>
                      <textarea
                        maxLength='200'
                        name='description'
                        id='description'
                        value={this.state.description}
                        onChange={this.handleFormInput}
                      />
                    </div>
                    <button
                      disabled={this.state.error}
                      className='formControlButtons'
                    >
                      Save
                    </button>
                  </form>
                  <button
                    id='cancelChangesButton'
                    onClick={this.handleCancelOfUpdate}
                    className='formControlButtons'
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className='plainUserDetails'>
                  <div>
                    <label>First name</label>
                    <input
                      disabled
                      name='firstName'
                      id='firstName'
                      defaultValue={this.state.firstName}
                    />
                  </div>
                  <div>
                    <label>Last name</label>
                    <input
                      disabled
                      name='lastName'
                      id='lastName'
                      defaultValue={this.state.lastName}
                    />
                  </div>
                  <div>
                    <label>Country</label>
                    <input
                      disabled
                      name='country'
                      id='country'
                      defaultValue={this.state.countryOfOrigin}
                    />
                    <CountryFlag countryOfOrigin={this.state.countryOfOrigin} />
                  </div>
                  <div>
                    <label>Description</label>
                    <textarea
                      disabled
                      maxLength='200'
                      name='description'
                      id='description'
                      value={this.state.description}
                      onChange={this.handleFormInput}
                    />
                  </div>
                </div>
              )}
              {!this.state.isEditDetailsClicked && (
                <button
                  id='editMyDetailsButton'
                  onClick={this.handleEditButton}
                >
                  Edit my details
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default StudentProfile;
