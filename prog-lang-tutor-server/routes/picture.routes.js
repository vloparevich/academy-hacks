const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const fileUploader = require("../config/cloudinary.setup");
// ****************************************************************************************
// GET route to get all the pictures from somewhere
// ****************************************************************************************
router.get("/", (req, res) => {
  User.find()
    .then((picturesFromDB) => res.status(200).json(picturesFromDB))
    .catch((err) => next(err));
});
// ****************************************************************************************
// POST route to
// ****************************************************************************************
router.post("/upload", fileUploader.single("profilePic"), (req, res, next) => {
  // console.log("file is: ", req.file);
  console.log("backend file path");
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file });
});

// ****************************************************************************************
// POST route to
// ****************************************************************************************
router.post("/savePicture", (req, res) => {
  // res.status(201).json({data: responseFromMyBackend})

  User.create(req.body)
    .then((saveNewPic) => {
      console.log("Created new movie: ", saveNewPic);
      res.status(200).json(saveNewPic);
    })
    .catch((err) => next(err));
});
module.exports = router;
