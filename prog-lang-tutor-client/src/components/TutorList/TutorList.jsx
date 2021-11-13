/////////////////////////////////////////////////////////
import React, { Component } from 'react';
import './TutorList.css';
import USER_SERVICE from '../../services/UserServices';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

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
        courses[j].courseName
          .toLowerCase()
          .includes(searchInput.toLowerCase()) &&
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
              <div>
                <img
                  className='tutorListPic'
                  src={tutorInfo.profilePic}
                  alt='profile'
                ></img>

                <p>
                  {tutorInfo.firstName} {tutorInfo.lastName}{' '}
                </p>
              </div>
              <h3>
                Courses: {tutorInfo.coursesTaught.courses[0].courseName}{' '}
                {tutorInfo.description}
              </h3>
              <h3> Teaching Experince: {tutorInfo.teachingExperience}</h3>{' '}
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default TutorList;
