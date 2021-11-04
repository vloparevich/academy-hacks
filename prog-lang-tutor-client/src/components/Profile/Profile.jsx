import React, { Component } from 'react';
import axios from 'axios';
import Timeslot from '../Timeslot/Timeslot';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';

class Profile extends Component {
  state = { userId: '6182e4cd1d76f2200ea580a8', isEditDetailsClicked: false };

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    axios
      .get(`http://localhost:5000/api/user/${this.state.userId}`)

      .then((user) => {
        this.setState(
          { user: user.data.user, firstName: user.data.user.firstName },
          () => console.log('USER', this.state.user)
        );
      });
  };

  getUserWithUpdatedProfilePicture = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('profilePic', file);
    PROFILE_SERVICE.handleUpload(uploadData, this.state.userId).then(
      (responseFromApi) => {
        console.log({ responseFromApi: responseFromApi });
        this.setState(
          {
            user: responseFromApi.user,
          },
          () => console.log('updated pic and user', this.state.user)
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
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        {this.state.user?.firstName && (
          <div className='profileContainer'>
            <div className='imageSection'>
              {this.state.user?.profilePic && (
                <img
                  id='profilePicture'
                  src={this.state.user?.profilePic}
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
              <div className='userdetails'></div>
              <div className='controlButtonsUserDetails'>
                {this.state.isEditDetailsClicked ? (
                  <form>
                    <div>
                      <label>First name</label>
                      <input
                        name='firstName'
                        id='firstName'
                        value={this.state.firstName}
                        onChange={this.handleFormInput}
                      />
                    </div>
                    <div>
                      <label>Last name</label>
                      <input
                        name='lastName'
                        id='lastName'
                        value={this.state.user.lastName}
                      />
                    </div>
                    <div>
                      <label>Country</label>
                      <input
                        name='country'
                        id='country'
                        value={this.state.user.countryOfOrigin}
                      />
                    </div>
                    <div>
                      <label>Teaching experience</label>
                      <input
                        name='experience'
                        id='experience'
                        value={this.state.user.teachingExperience}
                      />
                    </div>
                    <button className='formControlButtons'>Save changes</button>
                    <button className='formControlButtons'>
                      Cancel changes
                    </button>
                  </form>
                ) : (
                  <div className='plainUserDetails'>
                    <div>
                      <label>First name</label>
                      <input
                        disabled
                        name='firstName'
                        id='firstName'
                        defaultValue={this.state.user.firstName}
                      />
                    </div>
                    <div>
                      <label>Last name</label>
                      <input
                        disabled
                        name='lastName'
                        id='lastName'
                        defaultValue={this.state.user.lastName}
                      />
                    </div>
                    <div>
                      <label>Country</label>
                      <input
                        disabled
                        name='country'
                        id='country'
                        defaultValue={this.state.user.countryOfOrigin}
                      />
                    </div>
                    <div>
                      <label>Teaching experience</label>
                      <input
                        disabled
                        name='experience'
                        id='experience'
                        defaultValue={this.state.user.teachingExperience}
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
        )}
      </>
    );
  }
}

export default Profile;
