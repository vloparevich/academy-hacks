const { Schema, model } = require('mongoose');

const studentBookingSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'User' },
  tutorId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: String },
  pickedSlots: [{ type: Number }],
});

const StudentBooking = model('StudentBooking', studentBookingSchema);

module.exports = StudentBooking;
