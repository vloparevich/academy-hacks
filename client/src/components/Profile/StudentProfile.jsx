/* eslint-disable react-hooks/exhaustive-deps */
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';
import PROFILE_SERVICE from '../../services/ProfileServices';
import * as PATHS from '../../utils/paths.js';
import CountryFlag from '../CountryFlag/CountryFlag';
import MyLessons from '../MyLessons/MyLessons';
import USER_SERVICE from '../../services/UserServices.js';
import Modal from '../Modal/Modal';

const StudentProfile = (props) => {
  const [user, setUser] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [teachingExperience, setTeachingExperience] = useState('');
  const [timeRangeOfAvailability, setTimeRangeOfAvailability] = useState('');
  const [coursesTaught, setCoursesTaught] = useState('');
  const [isEditProfileClicked, seisEditProfileClicked] = useState(false);
  const [isEditDetailsClicked, setIsEditDetailsClicked] = useState(false);
  const [isShowMyBookingsClicked, setIsShowMyBookingsClicked] = useState(false);
  const [prevCourseName, setPrevCourseName] = useState('');
  const [isModalShowed, setIsModalShowed] = useState(false);

  useEffect(() => {
    console.log('from the props in cdid mount', user._id);
    setUser(props.user);
    console.log('first');
  }, []);

  useEffect(() => {
    getUser();
    console.log('second');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    user,
    firstName,
    lastName,
    profilePic,
    aboutMe,
    countryOfOrigin,
    teachingExperience,
    timeRangeOfAvailability,
    coursesTaught,
    isEditProfileClicked,
    isEditDetailsClicked,
    isShowMyBookingsClicked,
    prevCourseName,
    isModalShowed,
  ]);

  const getUser = () => {
    USER_SERVICE.getSpecificStudent(user._id).then((res) => {
      console.log('RESPONSE', res);
      setFirstName(res.user?.firstName);
      setLastName(res.user?.lastName);
      setCountryOfOrigin(res.user?.countryOfOrigin);
      setProfilePic(res.user?.profilePic);
      setAboutMe(res.user?.aboutMe);
    });
  };

  const showModal = (e) => {
    setIsModalShowed(!isModalShowed);
  };

  const handleDeleteButton = () => {
    USER_SERVICE.deleteStudent(user._id).then((responseFromApi) => {
      console.log('Student after deletion', responseFromApi);
      props.history.push(PATHS.HOMEPAGE);
    });
    props.handleLogout();
  };

  const handleCancelOfUpdate = () => {
    seisEditProfileClicked({
      isEditDetailsClicked: false,
    });
    getUser();
  };

  const handleEditProfileButton = () => {
    seisEditProfileClicked({
      isEditProfileClicked: !isEditProfileClicked,
    });
    if (isEditProfileClicked) {
      handleCancelOfUpdate();
    }
  };

  const handleShowBookingsButton = () => {
    setIsShowMyBookingsClicked({
      isShowMyBookingsClicked: !isShowMyBookingsClicked,
    });
  };

  const getUserWithUpdatedProfilePicture = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData();
    uploadData.append('profilePic', file);
    PROFILE_SERVICE.handleUpload(uploadData, user._id).then(
      (responseFromApi) => {
        setProfilePic({
          profilePic: responseFromApi.user,
        });
        getUser();
      }
    );
  };

  const handleEditButton = () => {
    setIsEditDetailsClicked({
      isEditDetailsClicked: !isEditDetailsClicked,
    });
  };

  const handleSavingChanges = (event) => {
    event.preventDefault();
    PROFILE_SERVICE.handleUpdateStudentDetails(
      user,
      firstName,
      lastName,
      profilePic,
      aboutMe,
      countryOfOrigin,
      teachingExperience,
      timeRangeOfAvailability,
      coursesTaught,
      isEditProfileClicked,
      isEditDetailsClicked,
      isShowMyBookingsClicked,
      prevCourseName,
      isModalShowed
    ).then(() => {
      setIsEditDetailsClicked(
        {
          isEditDetailsClicked: false,
        },
        () => {
          this.getUser();
        }
      );
    });
  };

  const handleFormInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  return (
    <>
      <div id='profileModule'>
        <div className='profileContainer'>
          <div className='imageSection'>
            {profilePic && (
              <img id='profilePicture' src={profilePic} alt='profile pic' />
            )}
            {isEditProfileClicked && (
              <label id='imageInputLabel'>
                Add/Update profile picture
                <input
                  id='imageInput'
                  type='file'
                  name='profilePic'
                  onChange={(event) => getUserWithUpdatedProfilePicture(event)}
                  // ref={(ref) => (this.fileInput = ref)}
                />
              </label>
            )}
          </div>
          <div className='userStudentDetailsSection'>
            <div className='controlButtonsUserDetails'>
              {isEditDetailsClicked ? (
                <>
                  <form
                    onSubmit={(event) => handleSavingChanges(event)}
                    autoComplete='off'
                  >
                    <div>
                      <label>First name</label>
                      <input
                        autoFocus
                        name='firstName'
                        id='firstName'
                        value={firstName}
                        onChange={handleFormInput}
                      />
                      {!firstName && (
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
                        value={lastName}
                        onChange={handleFormInput}
                      />
                      {!lastName && (
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
                        value={countryOfOrigin}
                        onChange={handleFormInput}
                      />
                      {!countryOfOrigin && (
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
                        value={aboutMe}
                        onChange={handleFormInput}
                      />
                    </div>
                    <button
                      // disabled={this.state.error}
                      className='formControlButtons'
                    >
                      Save
                    </button>
                  </form>
                  <button
                    id='cancelChangesButton'
                    onClick={handleCancelOfUpdate}
                    className='formControlButtons'
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <div className='plainUserDetails'>
                  <div>
                    <h3>
                      {firstName} {lastName}
                      {/* <CountryFlag
                      countryOfOrigin={this.state.countryOfOrigin}
                    /> */}
                    </h3>
                  </div>
                </div>
              )}
              {isEditProfileClicked && !isEditDetailsClicked && (
                <>
                  <button id='editMyDetailsButton' onClick={handleEditButton}>
                    Edit my details
                  </button>
                  <button id='deleteProfileButton' onClick={showModal}>
                    Delete profile
                  </button>
                  <Modal
                    onClose={showModal}
                    show={isModalShowed}
                    onConfirm={handleDeleteButton}
                  >
                    Are you sure you want to delete your profile?
                  </Modal>
                </>
              )}
            </div>
          </div>
          <div>
            <button
              style={{
                backgroundColor: isEditProfileClicked && '#F47174',
                color: isEditProfileClicked && '#fff',
              }}
              id='editMyProfileButton'
              onClick={handleEditProfileButton}
            >
              {isEditProfileClicked
                ? 'Hide control buttons'
                : 'Edit my profile'}
            </button>
          </div>
        </div>
        <div id='myClassesSection'>
          <button id='showMyBookingsButton' onClick={handleShowBookingsButton}>
            {isShowMyBookingsClicked ? 'Hide my bookings' : 'Show my bookings'}
          </button>
          {user?._id && isShowMyBookingsClicked && (
            <MyLessons studentId={user._id} />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
