import React, { Component } from "react";
import "./Home.css";
import SearchBar from "../Searchbar/SearchBar";
import USER_SERVICE from "../../services/UserServices";
import HomeNavbar from "../HomeNavbar/HomeNavbar";
import TutorRow from "../TutorRow/TutorRow";
import { Link } from "react-router-dom";

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

    console.log("after filtering", filteredTutors);
    this.setState({
      filteredTutors: filteredTutors,
    });
  };

  render() {
    return (
      <div>
        <HomeNavbar user={this.state.user} loading={this.state.loading} />
        <div className="landingPageImg"></div>
        <div className="titleHome">
          <h1>What are you going to learn today?</h1>
          <p>At Academy Hacks, we put you in control of your lessons...</p>
        </div>
        {/* <div>
          ((Compliation of different coding languages to go below, each linking
          to corresponding tutors))
        </div> */}

        <div className="searchBar">
          {/* <div className="footer">Hack Academy </div> */}
          <SearchBar onSearchQueryChange={this.onSearchInputChange} />
          {this.state.filteredTutors.map((tutor) => (
            <Link to={`/tutor/${tutor._id}`} key={tutor._id}>
              <TutorRow tutor={tutor} />
            </Link>
          ))}
        </div>
        <div className="tableContainer">
          <div className="courseTable">
            <table>
              <tr>
                <td>
                  <div className="javsScLogo">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
                  </div>

                  <Link to="/tutor/list">JavaScript tutors</Link>
                </td>
                <td>
                  <div className="javaLogo">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-plain-wordmark.svg" />
                  </div>
                  <Link to="/tutor/list">Java tutors</Link>
                </td>
                <td>
                  <div className="phpLogo">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg" />
                  </div>
                  <Link to="/tutor/list">PHP tutors</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/tutor/list">C++ tutors</Link>
                </td>
                <td>
                  <Link to="/tutor/list">C# tutors</Link>
                </td>
                <td>
                  <Link to="/tutor/list">Backend tutors</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="`/tutor/list">Frontend tutors</Link>
                </td>
                <td>
                  <Link to="/tutorList">Json tutors</Link>
                </td>
                <td>
                  <Link to="/tutorList">HTML/CSS tutors</Link>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <footer>
          Academy Hacks, we put you in control of your lessons© 2021.
          HackAcademy.com
        </footer>
      </div>
    );
  }
}

export default Home;
