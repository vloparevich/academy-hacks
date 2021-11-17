import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';
import * as PATHS from '../../utils/paths.js';
import CountryFlag from '../CountryFlag/CountryFlag';
import MyLessons from '../MyLessons/MyLessons';
import USER_SERVICE from '../../services/UserServices.js';
import Modal from '../Modal/Modal';

class StudentProfile extends Component {
  state = {
    firstName: '',
    lastName: '',
    profilePic: '',
    countryOfOrigin: '',
    teachingExperience: '',
    timeRangeOfAvailability: '',
    coursesTaught: '',
    isEditProfileClicked: false,
    isEditDetailsClicked: false,
    isShowMyBookingsClicked: false,
    prevCourseName: '',
    show: false,
  };

  showModal = (e) => {
    this.setState({
      show: !this.state.show,
    });
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
    USER_SERVICE.getSpecificStudent(this.state.user._id).then((res) => {
      this.setState({
        firstName: res.user.firstName,
        lastName: res.user.lastName,
        countryOfOrigin: res.user.countryOfOrigin,
        profilePic: res.user.profilePic,
        aboutMe: res.user.aboutMe,
      });
    });
  };

  handleDeleteButton = () => {
    USER_SERVICE.deleteStudent(this.state.user._id).then((responseFromApi) => {
      console.log('Student after deletion', responseFromApi);
      this.props.history.push(PATHS.HOMEPAGE);
    });
    this.props.handleLogout();
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

  handleShowBookingsButton = () => {
    this.setState({
      isShowMyBookingsClicked: !this.state.isShowMyBookingsClicked,
    });
  };

  handleEditProfileButton = () => {
    this.setState({ isEditProfileClicked: !this.state.isEditProfileClicked });
    if (this.state.isEditProfileClicked) {
      this.handleCancelOfUpdate();
    }
  };

  handleFormInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSavingChanges = (event) => {
    event.preventDefault();
    PROFILE_SERVICE.handleUpdateStudentDetails(this.state).then(() => {
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
        <div>
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
                        <label>About myself (max 1000 characters)</label>
                        <textarea
                          maxLength='1000'
                          name='aboutMe'
                          id='description'
                          value={this.state.aboutMe}
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
                      <h3>
                        {this.state.firstName} {this.state.lastName}{' '}
                        <CountryFlag
                          countryOfOrigin={this.state.countryOfOrigin}
                        />
                      </h3>
                    </div>
                    <div>
                      <p>{this.state.aboutMe}</p>
                    </div>
                  </div>
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
                      <button id='deleteProfileButton' onClick={this.showModal}>
                        Delete profile
                      </button>
                      <Modal
                        onClose={this.showModal}
                        show={this.state.show}
                        onConfirm={this.handleDeleteButton}
                      >
                        Are you sure you want to delete your profile?
                      </Modal>
                    </>
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
          <div id='myClassesSection'>
            <button
              id='showMyBookingsButton'
              onClick={this.handleShowBookingsButton}
            >
              {this.state.isShowMyBookingsClicked
                ? 'Hide my bookings'
                : 'Show my bookings'}
            </button>
            {this.state.user?._id && this.state.isShowMyBookingsClicked && (
              <MyLessons studentId={this.state.user._id} />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default StudentProfile;
