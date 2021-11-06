const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const fileUploader = require('../config/cloudinary.setup.js');
const Timeslot = require('../models/Timeslot.model');

// ****************************************************************************************
// GET route to render the form for adding review about a tutor
// ****************************************************************************************
router.post('/tutor/review/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;
  req.session.dealerLinkFromGlobalScope = dealerLink;
  const { dealerName, vin } = req.params;
  res.render('/tutor/:id', {
  });
});

// ****************************************************************************************
// POST route to post a review
// ****************************************************************************************
router.post('/add-review', isLoggedIn, async (req, res) => {
  const { dealerName, reviewContent, vin } = req.body;
  let { _id, firstName, lastName, vehicles, reviews } = req.session.user;
  const user_id = mongoose.Types.ObjectId(_id);
  try {
    const dealerInDb = await Dealer.findOne({ dealerName: dealerName });
    const createdReviewInDb = await Review.create({
      reviewContent,
      user_id,
      vin,
    });
    if (!dealerInDb) {
      await Dealer.create({ dealerName: dealerName });
    }
    await Dealer.findByIdAndUpdate(dealerInDb._id, {
      $push: { reviews: createdReviewInDb._id },
    });
    res.redirect(307, `/vehicles/details/${vin}`);
  } catch (err) {
    console.log('Soemthing went wrong during postin the review:', err);
  }
});

// ****************************************************************************************
// GET route to delete a review if it belongs to this user
// ****************************************************************************************
router.post('/delete/:reviewId/:vin', isLoggedIn, async (req, res) => {
  let reviewFromDB;
  let reviewCreatorIdFromDB;
  const { _id } = req.session.user;
  let { reviewId, vin } = req.params;
  const { dealerLink, dealerName } = req.body;
  req.session.dealerLinkFromGlobalScope = dealerLink;

  try {
    reviewId = mongoose.Types.ObjectId(reviewId);
    reviewFromDB = await Review.findById(reviewId);
    reviewCreatorIdFromDB = reviewFromDB.user_id.toString();
    if (_id === reviewCreatorIdFromDB) {
      await Review.findByIdAndRemove(reviewId);

      await Dealer.findOneAndUpdate(
        { dealerName: dealerName },
        {
          $pull: { reviews: reviewId },
        }
      );
    } else {
      req.session.errorDeletion =
        'You are not Authorized to Delete this review, you are not a creator of it....';
    }
  } catch (err) {
    console.log('Soemthing went wrong during deletion of the review:', err);
  }
  console.log('REDIRECTING DELETE');
  res.redirect(307, `/vehicles/details/${vin}`);
});

// ****************************************************************************************
// GET route to render the review for editing
// ****************************************************************************************
router.post('/edit/:reviewId/:dealerName/:vin', (req, res) => {
  const { reviewId, dealerName, vin } = req.params;
  const { dealerLink } = req.body;
  Review.findById(reviewId)
    .populate('user_id')
    .then((foundReview) => {
      console.log('My review:', foundReview);
      res.render('reviews/update-review-form', {
        foundReview: foundReview,
        dealerName: dealerName,
        reviewId: reviewId,
        vin: vin,
        dealerLink: dealerLink,
      });
    });
});

// ****************************************************************************************
// POST route to update the review
// ****************************************************************************************
router.post('/edit/:reviewId/:vin', async (req, res) => {
  const { reviewId, vin } = req.params;
  const { reviewContent, dealerLink } = req.body;
  req.session.dealerLinkFromGlobalScope = dealerLink;
  const { _id } = req.session.user;
  let reviewFromDB;
  let reviewCreatorIdFromDB;

  try {
    reviewFromDB = await Review.findById(reviewId);
    reviewCreatorIdFromDB = reviewFromDB.user_id.toString();
    if (_id === reviewCreatorIdFromDB) {
      await Review.findByIdAndUpdate(
        reviewId,
        { reviewContent: reviewContent },
        { new: true }
      );
    } else {
      req.session.errorDeletion =
        'You are not Authorized to EDIT this review, you are not a creator of it....';
    }
  } catch (err) {
    console.log('Soemthing went wrong during editing the review:', err);
  }
  console.log('REDIRECTING EDIT');
  res.redirect(307, `/vehicles/details/${vin}`);
});

module.exports = router;
