import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';
import USER_SERVICE from '../../services/UserServices';
import CountryFlag from '../CountryFlag/CountryFlag';
import * as PATHS from '../../utils/paths';

class TutorProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    profilePic: '',
    countryOfOrigin: '',
    teachingExperience: '',
    timeRangeOfAvailability: '',
    coursesTaught: '',
    prevCourseName: '',
    isEditDetailsClicked: false,
    isEditProfileClicked: false,
    isDetailsShownClicked: true,
    isMyScheduleShownClicked: false,
  };

  handleDetailsTabButton = () => {
    this.setState({
      isDetailsShownClicked: true,
      isMyScheduleShownClicked: false,
    });
  };

  handleMyScheduleTabButton = () => {
    this.setState({
      isDetailsShownClicked: false,
      isMyScheduleShownClicked: true,
    });
  };

  handleEditProfileButton = () => {
    this.setState({ isEditProfileClicked: !this.state.isEditProfileClicked });
    if (this.state.isEditProfileClicked) {
      this.handleCancelOfUpdate();
    }
  };

  handleDeleteButton = () => {
    USER_SERVICE.deleteTutor(this.state.user._id).then((responseFromApi) => {
      this.props.history.push(PATHS.HOMEPAGE);
    });
    this.props.handleLogout();
  };

  componentDidMount() {
    this.setState(
      {
        user: this.props.user,
      },
      () => {
        this.getUser();
      }
    );
  }

  getUser = () => {
    console.log('in the getUser', this.state);
    axios
      .get(`http://localhost:5000/api/user/${this.state.user._id}`)
      .then((dataFromDb) => {
        console.log('this is coming from BE', dataFromDb.data);
        const { user } = dataFromDb.data;
        console.log({ user: user });
        this.setState({
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
        });
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
          <div className='imageSection'>
            {this.state.profilePic && (
              <img
                id='profilePicture'
                src={this.state.profilePic}
                alt='profile pic'
              />
            )}
            {this.state.isEditProfileClicked && (
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
            )}
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
                      <label>Teaching experience (years)</label>
                      <input
                        min='1'
                        type='number'
                        name='teachingExperience'
                        id='experience'
                        value={this.state.teachingExperience}
                        onChange={this.handleFormInput}
                      />
                    </div>
                    <label className='timeRangeLabel'>
                      Time range of availability
                    </label>
                    <div className='timeRangeInputs'>
                      <input
                        type='number'
                        min='0'
                        max='23'
                        placeholder='From'
                        name='from'
                        id='from_input'
                        value={this.state.from}
                        onChange={this.handleFormInput}
                      />
                      <input
                        type='number'
                        min='0'
                        max='23'
                        placeholder='To'
                        name='to'
                        id='to'
                        value={this.state.to}
                        onChange={this.handleFormInput}
                      />
                    </div>
                    <div>
                      <label>Programming language</label>
                      <input
                        name='courseName'
                        id='courseName'
                        value={this.state.courseName}
                        onChange={this.handleFormInput}
                      />
                    </div>
                    <div>
                      <label>Description (max 1000 characters)</label>
                      <textarea
                        maxLength='1000'
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
                  <div id='navBarTutorProfile'>
                    <ul className='profile-tabs'>
                      <li onClick={this.handleDetailsTabButton}>Details</li>
                      <li onClick={this.handleMyScheduleTabButton}>
                        My schedule
                      </li>
                    </ul>
                  </div>
                  {this.state.isDetailsShownClicked && (
                    <>
                      <div>
                        <h3>
                          {this.state.firstName} {this.state.lastName}{' '}
                          <CountryFlag
                            countryOfOrigin={this.state.countryOfOrigin}
                          />
                        </h3>
                      </div>
                      <div>
                        <p>
                          <b>{this.state.teachingExperience}</b> years of
                          expereience at teaching <b>{this.state.courseName}</b>
                        </p>
                      </div>
                      <div>
                        <p>
                          <b>About the course:</b> {this.state.description}
                        </p>
                      </div>
                    </>
                  )}
                  {this.state.isEditProfileClicked &&
                    !this.state.isEditDetailsClicked && (
                      <>
                        <button
                          id='editMyDetailsButton'
                          onClick={this.handleEditButton}
                        >
                          Edit my details
                        </button>
                        <button
                          id='deleteProfileButton'
                          onClick={this.handleDeleteButton}
                        >
                          Delete my profile
                        </button>
                      </>
                    )}
                </div>
              )}
              {this.state.isMyScheduleShownClicked &&
                !this.state.isEditProfileClicked && (
                  <div>
                    <div>
                      <p className='timeRangeLabel'>
                        My availability:{' '}
                        <b>
                          {`${this.state.from}:00`}
                          {' - '}
                          {`${this.state.to}:00`}{' '}
                        </b>
                      </p>
                    </div>
                    <div id='tutorClasses'></div>
                  </div>
                )}
            </div>
          </div>
          <button
            style={{
              backgroundColor: this.state.isEditProfileClicked && '#F47174',
              color: this.state.isEditProfileClicked && '#fff',
            }}
            id='editMyProfileButton'
            onClick={this.handleEditProfileButton}
          >
            {this.state.isEditProfileClicked
              ? 'Hide control buttons'
              : 'Edit my profile'}
          </button>
        </div>
      </>
    );
  }
}

export default TutorProfile;
