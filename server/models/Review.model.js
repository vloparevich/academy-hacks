const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    reviewContent: { type: String, maxlength: 600 },
    student_id: { type: Schema.Types.ObjectId, ref: 'User' },
    tutor_id: { type: Schema.Types.ObjectId, ref: 'User'}
  });
  
  const Review = model('Review', reviewSchema);

  module.exports = Review;