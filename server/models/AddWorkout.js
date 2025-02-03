const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  WorkoutName: String,
  Sets: Number,
  Weight: Number,
  Duration: Number,
  WorkoutType: String,
});

const workout = mongoose.model("workout", workoutSchema);
module.exports = workout;
