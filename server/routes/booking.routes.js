const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const Timeslot = require('../models/Timeslot.model');
const StudentBooking = require('../models/StudentBooking.model');
const mongoose = require('mongoose');

// ****************************************************************************************
// POST route to add/modify the slots and update tutor's availability
// ****************************************************************************************
router.post('/', async (req, res, next) => {
  const {
    isTimeSlotChecked,
    calendarValueLong,
    calendarValueShort,
    pickedTimeSlots,
  } = req.body.data;

  let { tutorId } = req.body;
  tutorId = mongoose.Types.ObjectId(tutorId.id);
  try {
    let timeSlotInDb = await Timeslot.findOne({ tutorId });

    if (!timeSlotInDb) {
      timeSlotInDb = await Timeslot.create({
        tutorId: tutorId,
      });
      await User.findByIdAndUpdate(
        tutorId,
        {
          $push: {
            mySchedule: timeSlotInDb._id,
          },
        },
        { new: true }
      );
    }

    const isDateRegistered = await Timeslot.findOne({
      $and: [{ tutorId: tutorId }, { 'bookedSlots.date': calendarValueShort }],
    });

    if (!isDateRegistered) {
      await Timeslot.findByIdAndUpdate(timeSlotInDb._id, {
        $push: {
          bookedSlots: {
            date: calendarValueShort,
            bookedTime: [...pickedTimeSlots],
          },
        },
      });
    } else {
      const updatedAvailability = await Timeslot.updateOne(
        { 'bookedSlots.date': calendarValueShort },
        {
          $push: {
            'bookedSlots.$.bookedTime': pickedTimeSlots,
          },
        }
      );
    }
    res.status(201).json({ success: true });
  } catch (err) {
    res.json({
      success: false,
      message:
        "The class was not scheduled and tutor's availability was not updated",
    });
  }
});

// ****************************************************************************************
// POST route to get the status of this day by its date; This returns all the reservations
// on this day.
// ****************************************************************************************
router.post('/calendar', (req, res) => {
  let { thisDay, tutorId } = req.body;
  tutorId = mongoose.Types.ObjectId(tutorId);
  Timeslot.findOne({
    $and: [{ tutorId: tutorId }, { 'bookedSlots.date': thisDay }],
  })
    .select({ bookedSlots: { $elemMatch: { date: thisDay } } })
    .then((thisDateWithBookings) => {
      res.status(201).json({ thisDateWithBookings });
    })
    .catch((err) => {
      console.log({ err: err });
      res.json({ success: false, error: err });
    });
});

// ****************************************************************************************
// POST route to add more lessons on a student's bookings or create a new booking
// ****************************************************************************************
router.post('/saveBookingsOnStudent', async (req, res) => {
  const { date, pickedSlots, studentId, tutorId } = req.body;
  preparedStudentId = mongoose.Types.ObjectId(studentId);

  let booking;
  let updatedUser;
  console.log(
    'debug booking',
    { date: date },
    { studentId: preparedStudentId }
  );
  try {
    booking = await StudentBooking.findOneAndUpdate(
      {
        $and: [
          { date: date },
          { studentId: preparedStudentId },
          { tutorId: tutorId },
        ],
      },
      { $push: { pickedSlots: pickedSlots } },
      { new: true }
    );

    if (!booking) {
      booking = await StudentBooking.create({
        date,
        pickedSlots,
        studentId,
        tutorId,
      });

      updatedUser = await User.findByIdAndUpdate(
        studentId,
        { $push: { myBookings: booking._id } },
        { new: true }
      );
    }

    const tutorDetails = await User.findById(tutorId);

    res.status(200).json({
      success: true,
      booking: booking,
      updatedUser: updatedUser,
      tutor: tutorDetails,
    });
  } catch (err) {}
});

module.exports = router;
