const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const tutorsArray = require('../bin/seeds');
const bcrypt = require('bcryptjs');
const saltRounds = 10;

// ****************************************************************************************
// GET route to seed the tutors
// ****************************************************************************************
router.get('/seed-my-db', async (req, res, next) => {
  try {
    await tutorsArray.forEach(async (tutor) => {
      const {
        isTutor,
        email,
        profilePic,
        firstName,
        lastName,
        countryOfOrigin,
        teachingExperience,
        courseName,
        description,
        timeAvailableInRange,
        password,
      } = tutor;

      const hashedPassword = await bcrypt
        .genSalt(saltRounds)
        .then((salt) => bcrypt.hash(password, salt));
      const createdTutor = await User.create({
        isTutor: isTutor,
        firstName: firstName,
        lastName: lastName,
        countryOfOrigin: countryOfOrigin,
        teachingExperience: teachingExperience,
        email: email,
        password: hashedPassword,
        profilePic: profilePic,
        timeRangeOfAvailability: {
          from: timeAvailableInRange.from,
          to: timeAvailableInRange.to,
        },
      });
      const createdCourse = await Course.create({
        user_id: createdTutor._id,
        courses: { courseName: courseName, description: description },
      });
      const finalizedTutor = await User.findByIdAndUpdate(
        createdTutor._id,
        {
          $push: { coursesTaught: createdCourse._id },
        },
        { new: true }
      );
      return res.status(201).json({ success: true, tutor: finalizedTutor });
    });
  } catch (err) {
    res.json(
      { success: false, message: 'Error while trying to seed the database' },
      err
    );
  }
});

// ****************************************************************************************
// POST route to create a tutor's account
// ****************************************************************************************
router.post('/seed-my-db', async (req, res, next) => {
  const {
    isTutor,
    email,
    profilePic,
    firstName,
    lastName,
    countryOfOrigin,
    teachingExperience,
    courseName,
    description,
    mySchedule,
    timeAvailableInRange,
  } = req.body;
  try {
    const createdTutor = await User.create({
      isTutor: isTutor,
      firstName: firstName,
      lastName: lastName,
      countryOfOrigin: countryOfOrigin,
      teachingExperience: teachingExperience,
      email: email,
      profilePic: profilePic,
      timeRangeOfAvailability: {
        from: timeAvailableInRange.from,
        to: timeAvailableInRange.to,
      },
    });

    const createdCourse = await Course.create({
      user_id: createdTutor._id,
      courses: { courseName: courseName, description: description },
    });

    const finalizedTutor = await User.findByIdAndUpdate(
      createdTutor._id,
      {
        $push: { coursesTaught: createdCourse._id },
      },
      { new: true }
    );
    return res.status(201).json({ success: true, tutor: finalizedTutor });
  } catch (err) {
    res.json({
      success: false,
      message: "Tutor's details were not updated",
      err,
    });
  }
});

// router.get('/seed-my-dbs', (req, res, next) => {
//   console.log('TEST');
//   res.status(201).json({ success: true, message: 'DB has been ruined' });
// });

module.exports = router;
