import React, { Component } from 'react';
import USER_SERVICE from '../../services/UserServices';
import REVIEW_SERVICE from '../../services/ReviewService';
import '../ReviewTutor/ReviewTutor.css'

class ReviewTutor extends Component {
    state = {
        review: ' ',
    };

    state = { showing: false }

    componentDidMount = () => {
        console.log('mounting');
        this.getReviews();
    };

    getReviews = () => {
        REVIEW_SERVICE.getAllReviews(this.props.tutorId).then((reviews) => {
            console.log('reviews befor setting state', reviews.reviewsFromDb)
            this.setState({
                reviews: reviews.reviewsFromDb
            }, ()=> console.log('my reviews', this.state.reviews));
        })
    }

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
        REVIEW_SERVICE.createReview(studentId, tutorId, reviewContent).then(() => {
            this.getReviews();
        })

    }

    render() {
        const { showing } = this.state;
        return (
            <div>
                <h1>Reviews</h1>
                <button onClick={() => this.setState({ showing: !showing })}>Add Your Review</button>
                {showing?this.props.studentId && (
                    <form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <input id="review" name="review" placeholder="Add review here" type="text" value={this.state.review} onChange={(e) => this.handleInputChange(e)} required/>
                        <button onSubmit={() => this.setState({showing: false})}>Submit</button>
                    </form>) : null }
                <ul>
                    {this.state.reviews?.map((review) => {
                        return (
                            <li key={review._id}>{review.student_id} : "{review.reviewContent}"</li>
                        )
                    })
                    }
                </ul>
            </div>
        );
    }
}

export default ReviewTutor;
