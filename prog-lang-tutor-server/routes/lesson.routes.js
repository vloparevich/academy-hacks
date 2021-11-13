const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const fileUploader = require('../config/cloudinary.setup.js');
const Timeslot = require('../models/Timeslot.model');
const mongoose = require('mongoose');
const StudentBooking = require('../models/StudentBooking.model');

// ****************************************************************************************
// GET route to retrieve all the details about student's booked lessons and corresponding
// details in regards to the tutor
// ****************************************************************************************
router.get('/:studentId', async (req, res) => {
  const { studentId } = req.params;

  await User.findById(studentId)
    .populate({
      path: 'myBookings',
      populate: { path: 'tutorId', model: 'User' },
    })
    .then((studentWithBookings) => {
      res.status(200).json({ success: true, studentWithBookings });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        message: 'Students were not found',
        err,
      });
    });
});

// ****************************************************************************************
// POST route to cancel student's booking and release the timeslot for the tutor
// ****************************************************************************************
router.post('/cancelBooking', async (req, res) => {
  const {
    studentBookingId,
    date,
    scheduledHour,
    studentId,
    tutorId,
  } = req.body;
  try {
    const updatedStudentBooking = await StudentBooking.findByIdAndUpdate(
      studentBookingId,
      {
        $pull: {
          pickedSlots: scheduledHour,
        },
      },
      { new: true }
    );

    //clearing the db if no scheduled lessons left
    await StudentBooking.deleteOne({
      pickedSlots: { $exists: true, $size: 0 },
    });

    const preparedTutorId = mongoose.Types.ObjectId(tutorId);
    const updatedAvailability = await Timeslot.findOneAndUpdate(
      {
        $and: [{ 'bookedSlots.date': date }, { tutorId: preparedTutorId }],
      },
      {
        $pull: {
          'bookedSlots.$.bookedTime': scheduledHour,
        },
      }
    );
    res.status(201).json({ success: true });
  } catch (err) {
    console.log('THE ERROR', err);
    res.json({ success: false, message: err });
  }
});

module.exports = router;
