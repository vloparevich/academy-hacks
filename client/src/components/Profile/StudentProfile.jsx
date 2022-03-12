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
  const [user, setUser] = useState(props.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('');
  const [isEditProfileClicked, setIsEditProfileClicked] = useState(false);
  const [isEditDetailsClicked, setIsEditDetailsClicked] = useState(false);
  const [isShowMyBookingsClicked, setIsShowMyBookingsClicked] = useState(false);
  const [isModalShowed, setIsModalShowed] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    setUser(props.user);
    USER_SERVICE.getSpecificStudent(user._id).then((res) => {
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
      props.history.push(PATHS.HOMEPAGE);
    });
    props.handleLogout();
  };

  const handleCancelOfUpdate = () => {
    setIsEditProfileClicked(false);
    setIsEditDetailsClicked(false);
    getUser();
  };

  const handleEditProfileButton = () => {
    setIsEditProfileClicked(!isEditProfileClicked);
    if (isEditProfileClicked) {
      handleCancelOfUpdate();
    }
  };

  const handleShowBookingsButton = () => {
    setIsShowMyBookingsClicked(!isShowMyBookingsClicked);
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
    PROFILE_SERVICE.handleUpdateStudentDetails({
      user,
      firstName,
      lastName,
      profilePic,
      aboutMe,
      countryOfOrigin,
      isEditProfileClicked,
      isEditDetailsClicked,
      isShowMyBookingsClicked,
      isModalShowed,
    }).then(() => {
      setIsEditDetailsClicked(false);
      getUser();
    });
  };

  const handleFirstNameInput = (event) => {
    const { value } = event.target;
    setFirstName(value);
  };
  const handleLastNameInput = (event) => {
    const { value } = event.target;
    setLastName(value);
  };
  const handlecountryOfOriginInput = (event) => {
    const { value } = event.target;
    setCountryOfOrigin(value);
  };

  const handleAboutMeInput = (event) => {
    const { value } = event.target;
    setAboutMe(value);
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
                        onChange={handleFirstNameInput}
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
                        onChange={handleLastNameInput}
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
                        onChange={handlecountryOfOriginInput}
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
                        onChange={handleAboutMeInput}
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
                      <CountryFlag countryOfOrigin={countryOfOrigin} />
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
