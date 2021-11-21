/////////////////////////////////////////////////////////
import React, { Component } from 'react';
import './TutorList.css';
import USER_SERVICE from '../../services/UserServices';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import CountryFlag from '../CountryFlag/CountryFlag';
// import TutorDetails from '../TutorDetails/TutorDetails';
// import * as PATHS from '../../utils/paths';

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
    this.setState({
      filteredTutors: filteredTutors,
    });

    for (let i = 0; i < this.state.tutorsFromApi?.length; i++) {
      const courses = this.state.tutorsFromApi[i].coursesTaught?.courses
        ? this.state.tutorsFromApi[i].coursesTaught?.courses
        : 0;
      for (let j = 0; j < courses.length; j++) {
        courses[j].courseName?.toLowerCase() === searchInput?.toLowerCase() &&
          filteredTutors.push(this.state.tutorsFromApi[i]);
      }
    }

    searchInput && filteredTutors.length === 0 && (filteredTutors = []);
    searchInput?.length === 0 && (filteredTutors = []);

    this.setState({
      filteredTutors: filteredTutors,
    });
  };

  render() {
    return (
      <div className='tutorList'>
        <div className='title-list'>
          <div class='floating'></div>
          <div className='text-gradient-mint-blue-dark'></div>
        </div>
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
                  <div>
                    <h1>
                      {tutorInfo.firstName} {tutorInfo.lastName}{' '}
                      <CountryFlag
                        countryOfOrigin={tutorInfo?.countryOfOrigin}
                      />
                    </h1>
                    <div className='tutorDescription'>
                      <p>
                        Course(s):{' '}
                        {tutorInfo.coursesTaught.courses[0].courseName}{' '}
                      </p>
                      <p>
                        {' '}
                        Teaching Experince: {tutorInfo.teachingExperience} years
                      </p>{' '}
                      <p className='descriptionTutorList'>
                        {tutorInfo.coursesTaught.courses[0].description}
                      </p>
                      <div className='bookTutorButton'>
                        <Link to={`/tutor/${tutorInfo._id}`}>
                          <button>Book Lesson</button>
                        </Link>
                      </div>
                    </div>
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
