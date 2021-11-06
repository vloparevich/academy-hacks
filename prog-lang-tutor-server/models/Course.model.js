const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const courseSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  courses: [
    {
      courseName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

const Course = model('Course', courseSchema);

module.exports = Course;
