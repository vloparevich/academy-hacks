const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');

// ****************************************************************************************
// POST route to add a tutor's details
// ****************************************************************************************
router.post('/tutor', async (req, res, next) => {
  const {
    isTutor,
    firstName,
    lastName,
    countryOfOrigin,
    teachingExperience,
    courseName,
    description,
  } = req.body;

  // let profilePic;
  // if (req.file) {
  //   profilePic = req.file.path;
  // } else {
  //   profilePic = existingImage;
  // }
  try {
    const createdTutor = await User.create({
      isTutor: isTutor,
      firstName: firstName,
      lastName: lastName,
      countryOfOrigin: countryOfOrigin,
      teachingExperience: teachingExperience,
    });

    const createdCourse = await Course.create({
      user_id: createdTutor._id,
      courses: { courseName: courseName, description: description },
    });
    console.log({ createdCourse: createdCourse });
    const finalizedTutor = await User.findByIdAndUpdate(
      createdTutor._id,
      {
        $push: { course: createdCourse._id },
      },
      { new: true }
    );
    res.status(201).json({ success: true, tutor: finalizedTutor });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Tutor's details were not updated",
      err,
    });
  }
});

module.exports = router;
