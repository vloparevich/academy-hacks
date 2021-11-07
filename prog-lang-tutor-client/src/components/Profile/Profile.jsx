import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';

class Profile extends Component {
  state = { userId: '6186fe50cf33a3ed21dd1bc1', isEditDetailsClicked: false };

  componentDidMount() {
    console.log('from the props in cdid mount', this.props.userId);
    this.setState(
      {
        userId: this.props.userId,
      },
      () => {
        console.log('from state', this.state.userId);
        // this.getUser();
      }
    );
    this.getUser();
  }

  getUser = () => {
    console.log('calling getUser');
    console.log('in the getUser', this.state.userId);
    axios
      .get(`http://localhost:5000/api/user/${this.state.userId}`)
      .then((user) => {
        const {
          firstName,
          lastName,
          profilePic,
          countryOfOrigin,
          teachingExperience,
          timeRangeOfAvailability,
          coursesTaught,
        } = user.data.user;
        this.setState({
          firstName: firstName,
          lastName: lastName,
          countryOfOrigin: countryOfOrigin,
          profilePic: profilePic,
          teachingExperience: teachingExperience,
          from: timeRangeOfAvailability.from,
          to: timeRangeOfAvailability.to,
          courseName: coursesTaught.courses[0].courseName,
          description: coursesTaught.courses[0].description,
          prevCourseName: coursesTaught.courses[0].courseName,
        });
      });
  };

  getUserWithUpdatedProfilePicture = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('profilePic', file);
    PROFILE_SERVICE.handleUpload(uploadData, this.state.userId).then(
      (responseFromApi) => {
        this.setState(
          {
            profilePic: responseFromApi.user,
          },
          () => {
            this.getUser();
            console.log('updated pic and user', this.state.user);
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
    PROFILE_SERVICE.handleUpdateTutorDetails(
      this.state,
      this.state.userId
    ).then(() => {
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
        {/* {this.state.firstName && ( */}
        <div className='profileContainer'>
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
                  </div>
                  <div>
                    <label>Teaching experience (years)</label>
                    <input
                      disabled
                      name='experience'
                      id='experience'
                      defaultValue={this.state.teachingExperience}
                    />
                  </div>

                  <label className='timeRangeLabel'>
                    Time range of availability
                  </label>
                  <div className='timeRangeInputs'>
                    <input
                      disabled
                      type='text'
                      placeholder='From'
                      name='from'
                      id='from_input'
                      value={`From ${this.state.from}:00`}
                    />
                    <input
                      disabled
                      type='text'
                      placeholder='To'
                      name='to_input'
                      id='to'
                      value={`To ${this.state.to}:00`}
                    />
                  </div>

                  <div>
                    <label>Programming language</label>
                    <input
                      disabled
                      name='programmingLanguage'
                      id='programmingLanguage'
                      value={this.state.courseName}
                      onChange={this.handleFormInput}
                    />
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
        {/* )} */}
      </>
    );
  }
}

export default Profile;
