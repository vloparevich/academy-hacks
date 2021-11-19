const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const courseSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  courses: [
    {
      courseName: {
        type: String,
      },
      description: {
        type: String,
      },
    },
  ],
});

const Course = model('Course', courseSchema);

module.exports = Course;
