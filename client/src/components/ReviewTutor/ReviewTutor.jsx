import React, { Component } from 'react';
import REVIEW_SERVICE from '../../services/ReviewService';
import { Link } from 'react-router-dom';
import '../ReviewTutor/ReviewTutor.css'

class ReviewTutor extends Component {
    state = {
        review: '',
    };

    state = { showing: false }

    componentDidMount = () => {
        console.log('mounting');
        this.setState({ reviews: [] })
        this.getReviews();

    };

    getReviews = () => {
        REVIEW_SERVICE.getAllReviews(this.props.tutorId).then((reviews) => {
            // console.log('tutor', this.props.tutorId)
            this.setState({
                reviews: reviews.reviewsFromDb
            }, () => console.log('my reviews', this.state.reviews));
        })
    }

    handleInputChange = (e) => {
        this.setState({
            review: e.target.value
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const { studentId, tutorId } = this.props;
        const reviewContent = this.state.review;
        REVIEW_SERVICE.createReview(studentId, tutorId, reviewContent).then(() => {
            this.getReviews();
        })
        this.setState({ review: '', showing: !this.state.showing })

    }

    handleDelete = (review_id) => {
        REVIEW_SERVICE.deleteReview(review_id).then(() => {
            this.getReviews();
        })
    }

    render() {
        console.log("STATE", this.state)
        const { showing } = this.state;
        return (
            <div className='reviewArea'>
                <h1>Reviews</h1>

                {!this.state.currentUser?.isTutor ? (
                <>
                <button id="addReviewButton" onClick={() => this.setState({ showing: !showing })}>Add Your Review</button>
                </>
              ) : (
                <div className='TutorDetailsScheduleNotLoggedIn'>
                  <span>
                    ⚠ Please{' '}
                    <Link to='/auth/login'>
                      <b>log in</b>
                    </Link>{' '}
                    or{' '}
                    <Link to='/auth/signup'>
                      <b>sign up as a student</b>
                    </Link>{' '}
                    to book a class or leave a review.
                  </span>
                </div>
              )}

                {showing ? this.props.studentId && (
                    <form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <textarea name="review" placeholder="Add review here" type="text" value={this.state.review} onChange={(e) =>
                            this.handleInputChange(e)} required />
                        <button>Submit</button>
                    </form>) : null}
                <div className='reviewList'>
                    <ul>
                        {this.state.reviews?.map((review) =>
                        (<>
                            <li>
                                <h2>{review.student_id.firstName} {review.student_id.lastName}</h2>
                                <h3>- "{review.reviewContent}"</h3>
                                {this.props.studentId === review.student_id._id && <button id="deleteReviewButton" onClick={() => this.handleDelete(review._id)}>Delete Review</button>}
                            </li>
                            <hr />
                        </>
                        )
                        )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default ReviewTutor;