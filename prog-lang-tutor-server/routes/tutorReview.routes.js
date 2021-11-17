const { Router, response } = require('express');
const router = new Router();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const Review = require('../models/Review.model');


// ****************************************************************************************
// POST route to post a review
// ****************************************************************************************
router.post('/tutor/review', async (req, res) => {
    const { studentId, tutorId, reviewContent } = req.body;
    try {
        const preparedTutorId = mongoose.Types.ObjectId(tutorId);
        const preparedStudentId = mongoose.Types.ObjectId(studentId);
        const review = await Review.create({ student_id: preparedStudentId, tutor_id: preparedTutorId, reviewContent: reviewContent });
        const studentWithReview = await User.findByIdAndUpdate(studentId, {
            $push: { reviews: review._id }
        }, { new: true });
        const tutorWithReview = await User.findByIdAndUpdate(tutorId, {
            $push: { reviews: review._id }
        }, { new: true });
        const allReviews = await Review.find({ tutor_id: preparedTutorId }).populate('student_id');
        res.status(201).json({ success: true, allReviews: allReviews });
    } catch (err) {
        res.json({ success: false, message: 'Review not created', err: err })
    }
});


// ****************************************************************************************
// GET route to get all reviews
// ****************************************************************************************
router.get('/reviews/:tutorId', (req, res) => {
    const { tutorId } = req.params;
    console.log('tutorID in the ROUTE', { tutorId: tutorId })
    const preparedTutorId = mongoose.Types.ObjectId(tutorId);
    console.log('preparedTutorId in the ROUTE', { tutorId: preparedTutorId })
    Review.find({ tutor_id: preparedTutorId }).populate('student_id').then(reviewsFromDb => {
        console.log('getting this for ', { tutor_Id: preparedTutorId }, { reviewsFromDb: reviewsFromDb })
        res.status(200).json({ success: true, reviewsFromDb: reviewsFromDb })
    }).catch(err => {
        res.json({ success: false, message: "Reviews not retrieved", err: err })
    })
})




// ****************************************************************************************
// POST route to delete a review if it belongs to this user
// ****************************************************************************************
// router.post('/reviews/delete', (req, res) => {
//     const { studentId, tutorId, reviewContent } = req.body;
//     try {
//         const preparedTutorId = mongoose.Types.ObjectId(tutorId);
//         const preparedStudentId = mongoose.Types.ObjectId(studentId);
//         const review = await Review.deleteOne({ student_id: preparedStudentId, tutor_id: preparedTutorId, reviewContent: reviewContent });
//         const studentWithReview = await User.findOneAndDelete(studentId, {
//             $pull: { reviews: review._id }
//         }, { new: true });
//         const tutorWithReview = await User.findOneAndDelete(tutorId, {
//             $pull: { reviews: review._id }
//         }, { new: true });
//         const allReviews = await Review.find({ tutor_id: preparedTutorId }).populate('student_id');
//         res.status(201).json({ success: true, allReviews: allReviews });
//     } catch (err) {
//         res.json({ success: false, message: 'Review not deleted', err: err })
//     }
// })

module.exports = router;
