const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  isTutor: { type: Boolean },
  email: {
    type: String,
    unique: true,
    required: false,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [false, 'Password is required'],
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  countryOfOrigin: { type: String },
  profilePic: { type: String, required: false },
  teachingExperience: { type: Number },
  time: [{ type: Schema.Types.ObjectId, ref: 'Timeslot' }],
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
});

const User = model('User', userSchema);

module.exports = User;
