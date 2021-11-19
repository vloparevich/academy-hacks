const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const fileUploader = require('../config/cloudinary.setup.js');
const Timeslot = require('../models/Timeslot.model');
const mongoose = require('mongoose');

// ****************************************************************************************
// POST route to add/update profile image
// ****************************************************************************************
router.post(
  '/profileImage/:userId',
  fileUploader.single('profilePic'),
  async (req, res) => {
    const profilePic = req.file.path;
    const { userId } = req.params;
    try {
      const updatedUserFromDb = await User.findByIdAndUpdate(
        userId,
        { profilePic: profilePic },
        { new: true }
      );
      const userWithAllTheDetails = await User.findById(
        updatedUserFromDb._id
      ).populate('coursesTaught mySchedule');
      return res
        .status(201)
        .json({ success: true, user: userWithAllTheDetails });
    } catch (err) {
      res.json({
        success: false,
        message: 'Profile picture was not updated',
        err,
      });
    }
  }
);

// ****************************************************************************************
// PATCH route to update tutor's details
// ****************************************************************************************
router.patch('/tutor/:userId', async (req, res) => {
  const { userId } = req.params;
  const dataToBeSaved = req.body;
  const previousCourseName = dataToBeSaved.prevCourseName;
  const userIdPrepared = mongoose.Types.ObjectId(userId);
  let updatedUser;
  try {
    updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: dataToBeSaved.firstName,
        lastName: dataToBeSaved.lastName,
        countryOfOrigin: dataToBeSaved.countryOfOrigin,
        teachingExperience: dataToBeSaved.teachingExperience,
        timeRangeOfAvailability: {
          from: dataToBeSaved.from,
          to: dataToBeSaved.to,
        },
      },
      { new: true }
    );

    const updatedCourse = await Course.findOneAndUpdate(
      {
        $and: [
          ({ user_id: userIdPrepared },
          { 'courses.courseName': previousCourseName }),
        ],
      },
      {
        $set: {
          'courses.$.courseName': dataToBeSaved.courseName,
          'courses.$.description': dataToBeSaved.description,
        },
      },
      { new: true }
    );
    if (!updatedCourse) {
      const newCourseName = dataToBeSaved.courseName;
      const newCourse = await Course.create({
        user_id: userIdPrepared,
        courses: {
          courseName: newCourseName,
          description: dataToBeSaved.description,
        },
      });
      updatedUser = await User.findByIdAndUpdate(userIdPrepared, {
        coursesTaught: newCourse._id,
      });
    }
    res.status(201).json({ success: true, updatedUser: updatedUser });
  } catch (err) {
    console.log({ err: err });
    res.json({
      success: false,
      message: 'User details were not updated',
      err,
    });
  }
});

// ****************************************************************************************
// PATCH route to update student's details
// ****************************************************************************************
router.patch('/student/:userId', async (req, res) => {
  console.log('STUDENT IS BEING UPDATED');
  const { userId } = req.params;
  const dataToBeSaved = req.body;
  const userIdPrepared = mongoose.Types.ObjectId(userId);
  let updatedStudent;
  try {
    updatedStudent = await User.findByIdAndUpdate(
      userIdPrepared,
      {
        firstName: dataToBeSaved.firstName,
        lastName: dataToBeSaved.lastName,
        countryOfOrigin: dataToBeSaved.countryOfOrigin,
        aboutMe: dataToBeSaved.aboutMe,
      },
      { new: true }
    );
    res.status(201).json({ success: true, updatedUser: updatedStudent });
  } catch (err) {
    console.log({ err: err });
    res.json({
      success: false,
      message: 'User details were not updated',
      err,
    });
  }
});

module.exports = router;
