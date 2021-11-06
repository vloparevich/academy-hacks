import React, { Component } from 'react';
import USER_SERVICE from '../../services/UserServices';
import '../ReviewTutor/ReviewTutor.css'

class ReviewTutor extends Component {

    state = { 
        review: '',
      }

      componentDidMount = () => {
        console.log('mounting');
        this.getTutorDetails();
      };
    
      getTutorDetails = () => {
        const { params } = this.props.match;
    
        USER_SERVICE.getSpecificTutor(params.id).then((responseFromAPI) => {
          console.log({ responseFromAPI: responseFromAPI })
          this.setState({
            tutorDetails: responseFromAPI.tutor,
            timeRange: responseFromAPI.tutor.timeRangeOfAvailability,
            coursesTaught: responseFromAPI.tutor.coursesTaught.courses[0]
          })
        });
      };

    render() {
        return (
            <div>
            <h1>Review {this.state.tutorDetails?.firstName} {this.state.tutorDetails?.lastName}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label></label>
          <input type="text" name="Add your review here" value={this.state.review} />
          
          <button>Submit</button>
        </form>
      </div>
        );
    }
}

export default ReviewTutor;