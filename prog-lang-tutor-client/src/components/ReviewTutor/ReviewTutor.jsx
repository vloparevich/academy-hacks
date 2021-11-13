import React, { Component } from 'react';
import USER_SERVICE from '../../services/UserServices';
import REVIEW_SERVICE from '../../services/ReviewService';
import '../ReviewTutor/ReviewTutor.css'

class ReviewTutor extends Component {

    state = {}

    componentDidMount = () => {
        console.log('mounting');
    };

    handleInputChange = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('hitting review service')
        const { studentId, tutorId } = this.props;
        console.log('details of users', studentId, tutorId)
        const reviewContent = this.state.review;
        REVIEW_SERVICE.createReview(studentId, tutorId, reviewContent).then(reviews => {
            console.log('getting reviews', reviews)
            this.setState({
                reviews: reviews
            })
        })
    }

    render() {
        return (
            <div>
                <h1>Review {this.state.tutorDetails?.firstName} {this.state.tutorDetails?.lastName}</h1>
                {this.props.studentId && (
                    <form onSubmit={(e)=>this.handleFormSubmit(e)}>
                        <label></label>
                        <input id="review" name="review" placeholder="Add review here" type="text" value={this.state.review} onChange={(e) => this.handleInputChange(e)} />
                        <button>Submit</button>
                    </form>)}
                <ul>
                    <li>Review 1</li>
                </ul>
            </div>
        );
    }
}

export default ReviewTutor;