import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import USER_SERVICE from '../../services/UserServices';
import '../ReviewTutor/ReviewTutor.css'

class ReviewTutor extends Component {

    state = { 
        review: ' ',
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

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        // event.preventDefault();
        // const data = new FormData(event.target);
        
        // fetch('/api/form-submit-url', {
        //   method: 'POST',
        //   body: data,
        // });
      }

    render() {
        return (
            <div>
            <Navbar/>
            <h1>Review {this.state.tutorDetails?.firstName} {this.state.tutorDetails?.lastName}</h1>
        <form onSubmit={this.handleSubmit()}>
          <label></label>
          <input id="review" name="review" placeholder="Add your review here" type="text" />
          {/* value={this.state.review}  */}
          
          <button>Submit</button>
        </form>
      </div>
        );
    }
}

export default ReviewTutor;