const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tutorSchema = new Schema({
  email: {
    type: String,
    unique: false,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  profilePic: { type: String, required: false },
  availableTime: [{ type: String }], // 1,3,5,7
  bookedTimeSlots: [{ type: Schema.Types.ObjectId, ref: 'Timeslot' }],
  courses: [{ type: Schema.Types.ObjectId, ref: 'Courses' }],
});

const Tutor = model('Tutor', tutorSchema);
module.exports = Tutor;
