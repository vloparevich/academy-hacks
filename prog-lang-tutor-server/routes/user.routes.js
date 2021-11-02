const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const fileUploader = require('../config/cloudinary.config.js');




// ****************************************************************************************
// POST add Profile Pic
// ****************************************************************************************
router.post('/upload', fileUploader.single('profilePic'), (req, res, next) => {
  // console.log('file is: ', req.file)

  if (!req.file) {
    next(new Error('No file uploaded!'));
    return;
  }
  // get the URL of the uploaded file and send it as a response.
  // 'secure_url' can be any name, just make sure you remember to use the same when accessing it on the frontend

  res.json({ secure_url: req.file.path });
});

// Add Product (Create)
// router.post("/add-profilePic", uploadCloud.single("profilePic"), (req, res, next) => {
//   const picInputInfo = req.body;
//   picInputInfo.profilePic = req.file.path;

// productInputInfo.image = req.file.path;
// use file.url when using regular cloudinary method to get image url
// use file.path when using v2 cloudinary method to get image url

//   User.create(picInputInfo)
//     .then((newlyCreatedPic) => {
//       res.json({ success: true, profilePic: newlyCreatedPic });
//     })
//     .catch((err) =>
//       res.json({
//         success: false,
//         message: "There was an error while adding picture",
//         err,
//       })
//     );
// });

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
    profilePic,
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
