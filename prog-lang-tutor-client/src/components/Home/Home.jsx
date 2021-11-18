import React, { Component } from 'react';
import './Home.css';
import SearchBar from '../Searchbar/SearchBar';
import USER_SERVICE from '../../services/UserServices';
import TutorRow from '../TutorRow/TutorRow';
import { Link } from 'react-router-dom';
// import HomeNavbar from '../HomeNavbar/HomeNavbar';

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
    const javascript = {
      pathname: '/tutor/list/courses',
      courseName: 'javascript',
    };
    return (
      <div className='homepage-container'>
        {/* <HomeNavbar user={this.state.user} loading={this.state.loading} /> */}
        <div className='landingPageImg'></div>
        <div className='text-gradient-mint-blue-dark'>
          <h1 className='home-page-h1'>What are you going to learn today?</h1>
          <h2>At Academy Hacks, we put you in control of your lessons →</h2>
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
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg' width="20px" /> */}

                    <Link
                      // to={javascript}
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'javascript',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg'
                        width='20px'
                      />{' '}
                      JavaScript tutors
                      <p className='programingDescription'>
                        The programming language of the Web
                      </p>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain-wordmark.svg' width="20px"/> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'java',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain-wordmark.svg'
                        width='35vw'
                      />{' '}
                      Java tutors
                      <p className='programingDescription'>
                        A simple, efficient, general-purpose language
                      </p>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg' width="20px"/> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'php',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg'
                        width='35vw'
                      />{' '}
                      PHP tutors
                      <p className='programingDescription'>
                        A popular general-purpose scripting language
                      </p>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-line.svg' width="20px"/> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'c',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-line.svg'
                        width='35vw'
                      />{' '}
                      C tutors
                      <p className='programingDescription'>
                        Structured programming, lexical variable scope, and
                        recursion
                      </p>
                    </Link>
                  </div>
                </td>

                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain-wordmark.svg' width="20px" /> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'ruby',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-plain-wordmark.svg'
                        width='35vw'
                      />{' '}
                      Ruby tutors
                      <p className='programingDescription'>
                        Allows developers to alter how the language itself works
                      </p>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg' width="20px" /> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'swift',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg'
                        width='35vw'
                      />{' '}
                      SWIFT tutors
                      <p className='programingDescription'>
                        Programming language for iOS, iPadOS, macOS, tvOS, and
                        watchOS
                      </p>
                    </Link>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg' width="20px"/> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'rails',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain.svg'
                        width='35vw'
                      />{' '}
                      &nbsp; Rails tutors
                      <div className='programingDescription'>
                        Software library that extends the Ruby programming
                        language
                      </div>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-plain.svg' /> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'kotlin',
                      }}
                    >
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-plain.svg'
                        width='25vw'
                      />{' '}
                      &nbsp; Kotlin tutors
                      <p className='programingDescription'>
                        Free, open source, statically typed “pragmatic”
                        programming language
                      </p>
                    </Link>
                  </div>
                </td>
                <td>
                  <div className='logo'>
                    {/* <img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-plain.svg'   width='20px'/> */}

                    <Link
                      to={{
                        pathname: '/tutor/list/courses',
                        courseName: 'scala',
                      }}
                    >
                      {' '}
                      <img
                        src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-plain.svg'
                        width='25vw'
                      />{' '}
                      &nbsp; Scala tutors
                      <p className='programingDescription'>
                        Used in Data processing, distributed computing, and web
                        development
                      </p>
                    </Link>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        {/* </div> */}
      </div>
    );
  }
}

export default Home;
