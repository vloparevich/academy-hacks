const { Router } = require('express');
const router = new Router();
const User = require('../models/User.model');
const Course = require('../models/Course.model');
const fileUploader = require('../config/cloudinary.setup.js');
const Timeslot = require('../models/Timeslot.model');

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
      res.status(500).json({
        success: false,
        message: 'Profile picture was not updated',
        err,
      });
    }
  }
);

// ****************************************************************************************
// GET route to retrieve user details by its ID
// ****************************************************************************************
router.get('/');

module.exports = router;
