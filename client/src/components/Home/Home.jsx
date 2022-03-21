import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/SearchBar';
import TutorRow from '../TutorRow/TutorRow';
import LanguageQuickCard from './LanguageQuickCard';
import './Home.css';
import USER_SERVICE from '../../services/UserServices';
import languagesData from './LanguagesData';

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
        <div className='languageCardsContianer'>
          {languagesData.map((lang, i) => (
            <LanguageQuickCard
              key={lang.urlToImg}
              langName={lang.langName}
              shortLangDescription={lang.shortLangDescription}
              urlToImg={lang.urlToImg}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
