const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const studentSchema = new Schema({
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
});

const Student = model('Student', studentSchema);

module.exports = Student;
