const { Schema, model } = require('mongoose');

const timeslotSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  timeslots: [{ type: Number }],
  bookedTimeslots: [
    {
      type: Number,
      course_id: { type: Schema.Types.ObjectId, ref: 'Courses' },
    },
  ],
});

const Timeslot = model('Timeslot', timeslotSchema);

module.exports = Timeslot;
