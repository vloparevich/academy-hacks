import React, { Component } from 'react';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';
import USER_SERVICE from '../../services/UserServices';
import CountryFlag from '../CountryFlag/CountryFlag';
import * as PATHS from '../../utils/paths';
import MySchedule from './../MySchedule/MySchedule';
import Modal from '../Modal/Modal';

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
    show: false,
    detailsTabShown: true,
  };

  showModal = (e) => {
    this.setState(
      {
        show: !this.state.show,
      },
      () => console.log('set modal value to ', this.state.show)
    );
  };

  handleDeleteButton = () => {
    USER_SERVICE.deleteTutor(this.state.user._id).then((responseFromApi) => {
      console.log('Tutor after deletion', responseFromApi);
      this.props.history.push(PATHS.HOMEPAGE);
    });
    this.props.handleLogout();
  };

  handleDetailsTabButton = () => {
    this.setState({
      isDetailsShownClicked: true,
      isMyScheduleShownClicked: false,
      detailsTabShown: true,
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
      console.log('handleDeleteButton triggered');
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
    USER_SERVICE.getSpecificTutor(this.state.user._id).then(
      (responseFromApi) => {
        const { tutor } = responseFromApi;
        this.setState({
          firstName: tutor.firstName,
          lastName: tutor.lastName,
          countryOfOrigin: tutor.countryOfOrigin,
          profilePic: tutor.profilePic,
          teachingExperience: tutor.teachingExperience,
          from: tutor.timeRangeOfAvailability?.from
            ? tutor.timeRangeOfAvailability?.from
            : '00',
          to: tutor.timeRangeOfAvailability?.to
            ? tutor.timeRangeOfAvailability?.to
            : '00',
          courseName: tutor.coursesTaught?.courses[0].courseName,
          description: tutor.coursesTaught?.courses[0].description,
          prevCourseName: tutor.coursesTaught?.courses[0].courseName,
          mySchedule: tutor.mySchedule,
        });
      }
    );
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

          <div className='userTutorDetailsSection'>
            <div id='navBarTutorProfile'>
              <ul className='profile-tabs'>
                <li
                  onClick={this.handleDetailsTabButton}
                  // style={{
                  //   backgroundColor: this.state.detailsTabShown
                  //     ? '#32CD32'
                  //     : '#19324A',
                  // }}
                >
                  <button>📄 Details</button>
                </li>
                <li onClick={this.handleMyScheduleTabButton}>
                  <button>🗓 My Schedule</button>
                </li>
                <li onClick={this.handleEditButton}>
                  <button>✎ Edit My Details</button>
                </li>
              </ul>
            </div>
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
                    <button
                      id='cancelChangesButton'
                      onClick={this.handleCancelOfUpdate}
                      className='formControlButtons'
                    >
                      Cancel
                    </button>
                  </form>
                  <button id='deleteProfileButton' onClick={this.showModal}>
                    Delete my profile
                  </button>
                  <Modal
                    onClose={this.showModal}
                    show={this.state.show}
                    onConfirm={this.handleDeleteButton}
                  >
                    Are you sure you want to delete your profile?
                  </Modal>
                </>
              ) : (
                <div className='plainUserDetails'>
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
                </div>
              )}
              {this.state.isMyScheduleShownClicked &&
                !this.state.isEditProfileClicked &&
                !this.state.isEditDetailsClicked && (
                  <>
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
                        <div id='myScheduleCmp'>
                          <MySchedule
                            mySchedule={this.state.mySchedule?.bookedSlots}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default TutorProfile;
