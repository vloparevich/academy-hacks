/////////////////////////////////////////////////////////
import React, { Component } from 'react';
import './TutorList.css';
import USER_SERVICE from '../../services/UserServices';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import CountryFlag from '../CountryFlag/CountryFlag';

class TutorList extends Component {
  state = { courseName: this.props.location.courseName };

  fetchTutors = () => {
    USER_SERVICE.getAllTutors()
      .then((tutors) => {
        this.setState({ tutorsFromApi: tutors }, () => {
          this.getTutorsbyCoursename(this.props.location.courseName);
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.fetchTutors();
  };

  getTutorsbyCoursename = (searchInput) => {
    let filteredTutors = [];

    for (let i = 0; i < this.state.tutorsFromApi?.length; i++) {
      const courses = this.state.tutorsFromApi[i].coursesTaught?.courses
        ? this.state.tutorsFromApi[i].coursesTaught?.courses
        : 0;
      for (let j = 0; j < courses.length; j++) {
        courses[j].courseName.toLowerCase() === searchInput.toLowerCase() &&
          filteredTutors.push(this.state.tutorsFromApi[i]);
      }
    }

    searchInput && filteredTutors.length === 0 && (filteredTutors = []);
    searchInput.length === 0 && (filteredTutors = []);

    this.setState({
      filteredTutors: filteredTutors,
    });
  };

  render() {
    return (
      <div className='tutorList'>
        <h1>Courses</h1>

        <div>
          {this.state.filteredTutors?.map((tutorInfo) => (
            <>
              <div className='tutorListContainer'>
                <div className='tutorlistInfo'>
                  <img
                    className='tutorListPic'
                    src={tutorInfo.profilePic}
                    alt='profile'
                  ></img>
                  <div className='tutorDescription'>
                    <h2>
                      {tutorInfo.firstName} {tutorInfo.lastName}{' '}
                      {tutorInfo.countryOfOrigin}
                      <CountryFlag
                        countryOfOrigin={this.state.tutorInfo?.countryOfOrigin}
                      />
                    </h2>
                    <h3>
                      Courses: {tutorInfo.coursesTaught.courses[0].courseName}{' '}
                      {/* {tutorInfo.reviews} */}
                    </h3>
                    <h3> Teaching Experince: {tutorInfo.teachingExperience}</h3>{' '}
                    <h3>{tutorInfo.coursesTaught.courses[0].description}</h3>
                    {/* <button href='tutor/:id'>Book Lesson</button> */}
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default TutorList;
