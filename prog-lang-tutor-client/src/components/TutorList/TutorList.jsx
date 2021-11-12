/////////////////////////////////////////////////////////
import React, { Component } from 'react';
import './TutorList.css';
import USER_SERVICE from '../../services/UserServices';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

class TutorList extends Component {
  state = {
    filteredTutors: [],
    tutorsFromApi: [],
    showing: true,
  };

  fetchTutors = () => {
    console.log('fetch tutors');
    USER_SERVICE.getAllTutors()
      .then((tutors) => {
        this.setState({ tutorsFromApi: tutors });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.fetchTutors();
  };

  handleCategoryClick = (e) => {
    console.log(e.target.value);
    this.setState({
      isCategoryShown: !this.state.isCategoryShown,
    });
  };
  // const [categoryName, setCategoryName] = useState(yourDefaultCategory)
  render() {
    const { showing } = this.state;
    console.log(this.state.tutorsFromApi[0]);

    return (
      <div>
        <h1>Courses</h1>
        <div className='category'>
          <button onClick={() => this.setState({ showing: !showing })}>
            All
          </button>

          <a href='#' data-filter='all'>
            All
          </a>
          <button>Java</button>
          <button>JavaScript</button>
        </div>

        <div>
          {this.state.tutorsFromApi.map((tutorInfo) => (
            <>
              <div style={{ display: showing ? 'block' : 'none' }}>
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
                {tutorInfo.coursesTaught.courses[0].courseName} :{' '}
                {tutorInfo.description}
              </h3>
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default TutorList;
