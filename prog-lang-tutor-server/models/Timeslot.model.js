const { Schema, model } = require('mongoose');

const timeslotSchema = new Schema({
  // user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  tutorId: { type: Schema.Types.ObjectId, ref: 'User' },
  // timeslots: [{ type: Number }],
  // calendarValueShort: { type: String },
  // bookedTimeslots: [
  //   {
  //     type: Number,
  //     course_id: { type: Schema.Types.ObjectId, ref: 'Courses' },
  //   },
  // ],

  bookedSlots: [
    {
      date: {
        type: String,
      },
      bookedTime: [{ type: Number }],
    },
  ],
});

const Timeslot = model('Timeslot', timeslotSchema);

module.exports = Timeslot;
