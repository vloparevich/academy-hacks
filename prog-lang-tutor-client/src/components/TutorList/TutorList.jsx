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
        <div className='title-list'>
          <div class='floating'></div>
          <div className='text-gradient-mint-blue-dark'>
            {/* <div
              className='floating'
              style='height: 50px; width: 50px; background: rgb(200,200,200);'
            ></div> */}
            <h1 id='courses'>Courses/</h1>
          </div>
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
                      {/* <Link to='/tutor/{{:_id}}'>
                        <b>Book a Lesson</b>
                      </Link> */}
                      {/* <Redirect>
            exact
            path={PATHS.TUTOR_DETAILS}
            authenticate={this.authenticate}
            component={TutorDetails}
            user={this.state.user}
          /> */}
                      {/* <Link
                        to={{
                          pathname: PATHS.TUTOR_DETAILS,
                          toBeRedirectedBack: this.props.location,
                        }}
                      /> */}
                      <Link to='/tutor/:id'>Book Lesson</Link>
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
