const mongoose = require("mongoose");

const nutritionSchema = new mongoose.Schema({
  gender: String,
  weight: Number,
  height: Number,
  age: Number,
  activityLevel: String,
});

const nutrition = mongoose.model("nutrition", nutritionSchema);
module.exports = nutrition;
