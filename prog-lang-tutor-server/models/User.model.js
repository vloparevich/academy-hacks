const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  isTutor: { type: Boolean },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [false, 'Password is required'],
  },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  countryOfOrigin: { type: String },
  profilePic: { type: String, required: false },
  teachingExperience: { type: Number },
  mySchedule: { type: Schema.Types.ObjectId, ref: 'Timeslot' },
  timeRangeOfAvailability: {
    from: {
      type: Number,
    },
    to: {
      type: Number,
    },
  },
  coursesTaught: { type: Schema.Types.ObjectId, ref: 'Course' },
});

const User = model('User', userSchema);

module.exports = User;
