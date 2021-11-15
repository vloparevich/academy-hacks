const { Schema, model } = require('mongoose');

const timeslotSchema = new Schema({
  tutorId: { type: Schema.Types.ObjectId, ref: 'User' },
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
