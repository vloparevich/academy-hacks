import React, { Component } from 'react';
import './Home.css';
import SearchBar from '../Searchbar/SearchBar';
import USER_SERVICE from '../../services/UserServices';
import TutorRow from '../TutorRow/TutorRow';
import { Link } from 'react-router-dom';

class Home extends Component {
  state = {
    filteredTutors: [],
    tutorsFromApi: [],
  };

  fetchTutors = () => {
    USER_SERVICE.getAllTutors()
      .then((tutors) => {
        this.setState({ tutorsFromApi: tutors });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.fetchTutors();
  };

  onSearchInputChange = (searchInput) => {
    let filteredTutors = [];
    console.log(this.state.tutorsFromApi);
    for (let i = 0; i < this.state.tutorsFromApi.length; i++) {
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

    console.log('after filtering', filteredTutors);
    this.setState({
      filteredTutors: filteredTutors,
    });
  };

  render() {
    return (
      <div className='homepage-container'>
        <div className='landingPageImg'></div>
        <div className='titleHome'>
          <h1>What are you going to learn today?</h1>
          <p>At Academy Hacks, we put you in control of your lessons...</p>
        </div>
        <div className='searchBar'>
          <SearchBar onSearchQueryChange={this.onSearchInputChange} />
          {this.state.filteredTutors.map((tutor) => (
            <Link to={`/tutor/${tutor._id}`} key={tutor._id}>
              <TutorRow tutor={tutor} />
            </Link>
          ))}
        </div>
        <div className='tableContainer'>
          <div className='courseTable'>
            <table>
              <tr>
                <td>
                  <div className='javsScLogo'>
                    <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg' />
                  </div>

                  <Link to='/tutor/list/courses'>JavaScript tutors</Link>
                </td>
                <td>
                  <div className='javaLogo'>
                    <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain-wordmark.svg' />
                  </div>
                  <Link to='/tutor/list/courses'>Java tutors</Link>
                </td>
                <td>
                  <div className='phpLogo'>
                    <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg' />
                  </div>
                  <Link to='/tutor/list/courses'>PHP tutors</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to='/tutor/list/courses'>C++ tutors</Link>
                </td>
                <td>
                  <Link to='/tutor/list/courses'>C# tutors</Link>
                </td>
                <td>
                  <Link to='/tutor/list/courses'>Backend tutors</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to='/tutor/list/courses'>Frontend tutors</Link>
                </td>
                <td>
                  <Link to='/tutor/list/courses'>Json tutors</Link>
                </td>
                <td>
                  <Link to='/tutor/list/courses'>HTML/CSS tutors</Link>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
