const { Router } = require("express");
const router = new Router();
const User = require("../models/User.model");
const Course = require("../models/Course.model");
const fileUploader = require("../config/cloudinary.setup.js");
const Timeslot = require("../models/Timeslot.model");

// ****************************************************************************************
// GET route to get all the tutors
// ****************************************************************************************
router.get("/tutor/list", (req, res, next) => {
  User.find({ isTutor: true })
    .populate("coursesTaught")
    .then((tutors) => {
      res.status(200).json({ success: true, tutors });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Tutors were not found",
        err,
      });
    });
});

// ****************************************************************************************
// GET route to get the details of the specific tutor
// ****************************************************************************************
router.get("/tutor/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .populate("coursesTaught mySchedule")
    .then((tutor) => {
      console.log('Getting info of tutor', tutor);
      res.status(200).json({ success: true, tutor });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Tutor or Student was not found",
        err: err,
      });
    });
});

// ****************************************************************************************
// GET route to get a specific student
// ****************************************************************************************
router.get("/student/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((student) => {
      return res.status(200).json({ success: true, student });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "Tutor or Student was not found",
        err: err,
      });
    });
});

// ****************************************************************************************
// GET route to get a specific student/tutor
// ****************************************************************************************
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log('HIT USER');
  User.findById(id)
    .populate('coursesTaught mySchedule')
    .then((user) => {
      res.status(200).json({ success: true, user });
    })
    .catch((err) => {
      res.json({
        success: false,
        message: "User was not found",
        err: err,
      });
    });
});

// ****************************************************************************************
// POST route to create a tutor's account
// ****************************************************************************************
router.post("/tutor", async (req, res, next) => {
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

  // let profilePic;
  // if (req.file) {
  //   profilePic = req.file.path;
  // } else {
  //   profilePic = existingImage;
  // }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      res.status(400).json({
        success: false,
        message: "User with this email is already regietered",
      });
    }

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

// ****************************************************************************************
// DELETE route to remove tutor and its courses
// ****************************************************************************************
router.delete("/tutor/:tutorId", async (req, res, next) => {
  const { tutorId } = req.params;
  try {
    const removedTutor = await User.findByIdAndRemove(tutorId);
    await Course.deleteMany({ user_id: removedTutor._id });
    await Timeslot.findOneAndDelete({ user_id: removedTutor._id });
    res
      .status(200)
      .json({ success: true, message: { removedTutor: removedTutor } });
  } catch (err) {
    res.json({
      success: false,
      message: "Tutor has not been deleted",
      err,
    });
  }
});

module.exports = router;
