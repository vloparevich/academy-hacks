const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');

// ****************************************************************************************
// GET route to get a specific tutor/student
// ****************************************************************************************
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate('courses')
    .then((user) => {
      res.status(200).json({ success: true, user });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Tutor or Student was not found',
        err: err,
      });
    });
});

// ****************************************************************************************
// GET route to get all the tutors
// ****************************************************************************************
router.get('/tutor/list', (req, res, next) => {
  User.find({ isTutor: true })
    .then((tutors) => {
      res.status(200).json({ success: true, message: tutors });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Tutors were not found',
        err,
      });
    });
});

// ****************************************************************************************
// POST route to add a tutor's details
// ****************************************************************************************
router.post('/tutor', async (req, res, next) => {
  const {
    isTutor,
    email,
    firstName,
    lastName,
    countryOfOrigin,
    teachingExperience,
    courseName,
    description,
    time,
  } = req.body;

  // let profilePic;
  // if (req.file) {
  //   profilePic = req.file.path;
  // } else {
  //   profilePic = existingImage;
  // }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User with this email is already regietered',
      });
    }

    const createdTutor = await User.create({
      isTutor: isTutor,
      firstName: firstName,
      lastName: lastName,
      countryOfOrigin: countryOfOrigin,
      teachingExperience: teachingExperience,
      email: email,
    });

    const createdCourse = await Course.create({
      user_id: createdTutor._id,
      courses: { courseName: courseName, description: description },
    });

    const finalizedTutor = await User.findByIdAndUpdate(
      createdTutor._id,
      {
        $push: { courses: createdCourse._id },
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

// ****************************************************************************************
// DELETE route to remove tutor and its courses
// ****************************************************************************************
router.delete('/tutor/:tutorId', async (req, res, next) => {
  const { tutorId } = req.params;
  try {
    const removedTutor = await User.findByIdAndRemove(tutorId);
    console.log({ removedTutor: removedTutor });
    await Course.deleteMany({ user_id: removedTutor._id });
    res
      .status(200)
      .json({ success: true, message: { removedTutor: removedTutor } });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Tutor has not been deleted',
      err,
    });
  }
});

module.exports = router;
