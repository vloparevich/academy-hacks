// const express = require("express");
// const router = express.Router();
// const User = require("../../models/User");
// const uploadCloud = require("../../config/cloudinary.setup");

// /* GET home page */
// router.patch(
//     "/image/:userId",
//     uploadCloud.single("profilePic"),
//     (req, res, next) => {

//         User.findByIdAndUpdate(
//             req.params.userId,
//             { profilePic: req.file.path },
//             { new: true }
//         )
//             .then((updatedUser) => {
//                 res.json({ success: true, profilePic: updatedUser });
//             })
//             .catch((err) =>
//                 res.json({
//                     success: false,
//                     message: "Error while trying to update product image",
//                     err,
//                 })
//             );
//     }
// );

// router.patch(
//     "/imageArray/:userId",
//     uploadCloud.array("imageArray"),
//     (req, res, next) => {
//         // if using cloudinary v2 method, use req.file.path. For original method req.file.url
//         User.findById(req.params.userId)
//             .then((userFromDB) => {
//                 req.files.forEach((file) => {
//                     userFromDB.imageArray.push(file.path);
//                     // cloudinary original method use file.url
//                     // cloudinary v2 method use file.path
//                 });
//                 userFromDB
//                     .save()
//                     .then((updatedUser) => {
//                         res.json({ success: true, profilePic: updatedUser });
//                     })
//                     .catch((err) =>
//                         res.json({
//                             success: false,
//                             message: "Error while trying to update image Array",
//                             err,
//                         })
//                     );
//             })
//             .catch((err) =>
//                 res.json({
//                     success: false,
//                     message:
//                         "Error while trying to get product to update image Array",
//                     err,
//                 })
//             );
//     }
// );

// module.exports = router;