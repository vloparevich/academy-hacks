const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const tutorSchema = new Schema({
  name: { type: String },
});

const Tutor = model('Tutor', tutorSchema);
module.exports = Tutor;
