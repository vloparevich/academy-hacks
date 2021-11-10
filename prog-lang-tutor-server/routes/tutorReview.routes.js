const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Review = require('../models/Review.model');


// ****************************************************************************************
// POST route to post a review
// ****************************************************************************************
router.post('/tutor/review', async (req, res) => {
    
    const { userId, reviewContent, tutorId } = req.body;
    try {
        const review = await Review.create({ user_id: userId, reviewContent: reviewContent, tutor_id: tutorId });
        const userWithReview = await User.findByIdAndUpdate(userId, {
            $push: { reviews: review._id }
        }, { new: true });
        const tutorWithReview = await User.findByIdAndUpdate(tutorId, {
            $push: { tutorReviews: review._id }
        }, { new: true });
        Promise.all([review, userWithReview, tutorWithReview]).then(reviewAndUsers => {
            res.status(200).json({success:true, reviewAndUsers:reviewAndUsers})
        })
    } catch (err) {
        res.json({success:false, message:'Review not created', err:err})
    }
});





// ****************************************************************************************
// GET route to delete a review if it belongs to this user
// ****************************************************************************************
// router.post('/delete/:reviewId/:vin', isLoggedIn, async (req, res) => {
//   let reviewFromDB;
//   let reviewCreatorIdFromDB;
//   const { _id } = req.session.user;
//   let { reviewId, vin } = req.params;
//   const { dealerLink, dealerName } = req.body;
//   req.session.dealerLinkFromGlobalScope = dealerLink;

//   try {
//     reviewId = mongoose.Types.ObjectId(reviewId);
//     reviewFromDB = await Review.findById(reviewId);
//     reviewCreatorIdFromDB = reviewFromDB.user_id.toString();
//     if (_id === reviewCreatorIdFromDB) {
//       await Review.findByIdAndRemove(reviewId);

//       await Dealer.findOneAndUpdate(
//         { dealerName: dealerName },
//         {
//           $pull: { reviews: reviewId },
//         }
//       );
//     } else {
//       req.session.errorDeletion =
//         'You are not Authorized to Delete this review, you are not a creator of it....';
//     }
//   } catch (err) {
//     console.log('Soemthing went wrong during deletion of the review:', err);
//   }
//   console.log('REDIRECTING DELETE');
//   res.redirect(307, `/vehicles/details/${vin}`);
// });

// ****************************************************************************************
// GET route to render the review for editing
// ****************************************************************************************
// router.post('/edit/:reviewId/:dealerName/:vin', (req, res) => {
//   const { reviewId, dealerName, vin } = req.params;
//   const { dealerLink } = req.body;
//   Review.findById(reviewId)
//     .populate('user_id')
//     .then((foundReview) => {
//       console.log('My review:', foundReview);
//       res.render('reviews/update-review-form', {
//         foundReview: foundReview,
//         dealerName: dealerName,
//         reviewId: reviewId,
//         vin: vin,
//         dealerLink: dealerLink,
//       });
//     });
// });

// ****************************************************************************************
// POST route to update the review
// ****************************************************************************************
// router.post('/edit/:reviewId/:vin', async (req, res) => {
//   const { reviewId, vin } = req.params;
//   const { reviewContent, dealerLink } = req.body;
//   req.session.dealerLinkFromGlobalScope = dealerLink;
//   const { _id } = req.session.user;
//   let reviewFromDB;
//   let reviewCreatorIdFromDB;

//   try {
//     reviewFromDB = await Review.findById(reviewId);
//     reviewCreatorIdFromDB = reviewFromDB.user_id.toString();
//     if (_id === reviewCreatorIdFromDB) {
//       await Review.findByIdAndUpdate(
//         reviewId,
//         { reviewContent: reviewContent },
//         { new: true }
//       );
//     } else {
//       req.session.errorDeletion =
//         'You are not Authorized to EDIT this review, you are not a creator of it....';
//     }
//   } catch (err) {
//     console.log('Soemthing went wrong during editing the review:', err);
//   }
//   console.log('REDIRECTING EDIT');
//   res.redirect(307, `/vehicles/details/${vin}`);
// });

module.exports = router;
