import React, { Component } from 'react';
import './TutorRow.css';
import countries from '../../resources/countries.json';
import axios from 'axios';
import CountryFlag from '../CountryFlag/CountryFlag';

export default class TutorRow extends Component {
  state = {
    coursesTaught: '',
  };

  componentsDidMount() {
    console.log('from the props in did mount', this.props.user._id);
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
        console.log('this is coming from BE', dataFromDb.data);
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

    const nationalFlag = countries.find(
      (country) => country.name.common === tutor.countryOfOrigin
    )?.flag;
    return (
      <div className='tutor-row-container'>
        <div className='tutor-row'>
          <div className='SearchCardAvatarWrapper'>
            <img
              className='RowProfilePicture'
              src={tutor.profilePic}
              alt='tutor-small-img'
            />
          </div>
          <div className='TutorDescriptionBlock'>
            <div className='TutorName'>
              {/* {tutor.firstName} {tutor.lastName[0]?.toUpperCase()}. */}
              <div className='TutorInfo'>
                <h3>
                  {tutor.firstName} {tutor.lastName}{' '}
                  <CountryFlag countryOfOrigin={tutor?.countryOfOrigin} />
                </h3>

                <p>
                  <span>
                    {/* hi {tutor.courseName} {tutor.description} */}
                    Course(s): {tutor.coursesTaught.courses[0].courseName}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* <div className='SearchCardActions'>
          <div className='TutorReviews'>5 Stars</div>
        </div> */}
        </div>
      </div>
    );
  }
}
