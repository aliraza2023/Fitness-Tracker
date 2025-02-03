const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/fitnesstrackerdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/user/profile", async (req, res) => {
  try {
    const user = await User.findOne();
    res.json(user);
  } catch (err) {
    res.json({ error: "Error fetching profile" });
  }
});

app.put("/user/profile/update", async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOneAndUpdate(
      {},
      { password, email },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.json({ error: "Error updating profile" });
  }
});


app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json("User already exists");
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.json("User registered successfully");
  } catch (error) {
    console.error(error);
    res.json("Error registering user");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.password === password) {
        return res.json("Success");
      } else {
        return res.json("Incorrect password");
      }
    } else {
      return res.json("User not found");
    }
  } catch (error) {
    console.error(error);
    res.json("Error logging in");
  }
});

const workoutSchema = new mongoose.Schema({
  workoutName: { type: String, required: true },
  sets: { type: Number, required: true },
  weight: { type: Number, required: true },
  duration: { type: Number, required: true },
  workoutType: { type: String, required: true },
  exerciseType: { type: String, required: true },
  intensity: { type: String, required: true },
  caloriesBurned: { type: Number, required: true },
});

const Workout = mongoose.model("Workout", workoutSchema);

app.get("/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.json({ message: "Failed to fetch workouts", error });
  }
});

app.post("/workouts", async (req, res) => {
  try {
    const {
      workoutName,
      sets,
      weight,
      duration,
      workoutType,
      exerciseType,
      intensity,
    } = req.body;

    const METValues = {
      running: 7.5,
      cycling: 6.0,
      swimming: 7.0,
      walking: 3.8,
    };
    const MET = METValues[exerciseType] || 5.0;
    const weightInKg = weight;
    const durationInHours = duration / 60;
    const caloriesBurned = (MET * weightInKg * durationInHours).toFixed(2);

    const newWorkout = new Workout({
      workoutName,
      sets,
      weight,
      duration,
      workoutType,
      exerciseType,
      intensity,
      caloriesBurned,
    });

    await newWorkout.save();
    res.json({ message: "Workout added successfully", workout: newWorkout });
  } catch (error) {
    console.error(error);
    res.json({ message: "Failed to add workout", error });
  }
});

app.put("/workouts/:id", async (req, res) => {
  const workoutId = req.params.id;
  const updatedData = req.body;

  try {
    if (
      updatedData.exerciseType ||
      updatedData.weight ||
      updatedData.duration
    ) {
      const METValues = {
        running: 7.5,
        cycling: 6.0,
        swimming: 7.0,
        walking: 3.8,
      };
      const MET = METValues[updatedData.exerciseType] || 5.0;
      const weightInKg = updatedData.weight;
      const durationInHours = updatedData.duration / 60;
      updatedData.caloriesBurned = (MET * weightInKg * durationInHours).toFixed(
        2
      );
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      workoutId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );
    if (updatedWorkout) {
      res.json({
        message: "Workout updated successfully",
        workout: updatedWorkout,
      });
    } else {
      res.json({ message: "Workout not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Failed to update workout", error });
  }
});

app.delete("/workouts/:id", async (req, res) => {
  const workoutId = req.params.id;

  try {
    const deletedWorkout = await Workout.findByIdAndDelete(workoutId);
    if (deletedWorkout) {
      res.json({
        message: "Workout deleted successfully",
        workout: deletedWorkout,
      });
    } else {
      res.json({ message: "Workout not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Failed to delete workout", error });
  }
});

const nutritionSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  activityLevel: { type: String, required: true },
});

const Nutrition = mongoose.model("Nutrition", nutritionSchema);

app.get("/nutrition", async (req, res) => {
  try {
    const nutrition = await Nutrition.find();
    res.json(nutrition);
  } catch (error) {
    res.json({ message: "Failed to fetch nutrition" });
  }
});

app.post("/nutrition", async (req, res) => {
  try {
    const newNutrition = new Nutrition(req.body);
    await newNutrition.save();
    res.json({ message: "Nutrition added successfully" });
  } catch (error) {
    res.json({ message: "Failed to add Nutrition", error });
  }
});

app.put("/nutrition/:id", async (req, res) => {
  const nutritionId = req.params.id;
  const updatedData = req.body;

  try {
    const updatedNutrition = await Nutrition.findByIdAndUpdate(
      nutritionId,
      updatedData,
      { new: true, runValidators: true }
    );
    if (updatedNutrition) {
      res.json({
        message: "Nutrition updated successfully",
        nutrition: updatedNutrition,
      });
    } else {
      res.json({ message: "Nutrition not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Failed to update nutrition", error });
  }
});

app.delete("/nutrition/:id", async (req, res) => {
  const nutritionId = req.params.id;

  try {
    const deletedNutrition = await Nutrition.findByIdAndDelete(nutritionId);
    if (deletedNutrition) {
      res.json({
        message: "Nutrition deleted successfully",
        nutrition: deletedNutrition,
      });
    } else {
      res.json({ message: "Nutrition not found" });
    }
  } catch (error) {
    console.error(error);
    res.json({ message: "Failed to delete nutrition", error });
  }
});

const commentSchema = new mongoose.Schema({
  username: String,
  timestamp: String,
  text: String,
  replies: [
    {
      username: String,
      text: String,
      timestamp: String,
    },
  ],
});

const Comment = mongoose.model("Comment", commentSchema);

app.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (err) {
    res.send(err);
  }
});

app.post("/comments", async (req, res) => {
  const { username, text } = req.body;
  const newComment = new Comment({
    username,
    timestamp: "Just now",
    text,
    replies: [],
  });

  try {
    const savedComment = await newComment.save();
    res.json(savedComment);
  } catch (err) {
    res.send(err);
  }
});

app.post("/comments/:id/reply", async (req, res) => {
  const { id } = req.params;
  const { username, text } = req.body;

  try {
    const comment = await Comment.findById(id);
    comment.replies.push({
      username,
      text,
      timestamp: "Just now",
    });
    await comment.save();
    res.json(comment);
  } catch (err) {
    res.send(err);
  }
});

// Diet plan schema
const dietPlanSchema = new mongoose.Schema({
  dietPlanName: String,
  caloriesTarget: Number,
  mealType: String,
  specialNotes: String,
});

const DietPlan = mongoose.model("DietPlan", dietPlanSchema);

app.post("/api/diet-plans", async (req, res) => {
  const { dietPlanName, caloriesTarget, mealType, specialNotes } = req.body;

  try {
    const newDietPlan = new DietPlan({
      dietPlanName,
      caloriesTarget,
      mealType,
      specialNotes,
    });

    await newDietPlan.save();
    res.json(newDietPlan);
  } catch (err) {
    res.json({ error: "Error adding diet plan" });
  }
});

// API route to get all diet plans
app.get("/api/diet-plans", async (req, res) => {
  try {
    const dietPlans = await DietPlan.find();
    res.json(dietPlans);
  } catch (err) {
    res.json({ error: "Error fetching diet plans" });
  }
});

// Edit Diet Plan (PUT)
app.put("/api/diet-plans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDietPlan = await DietPlan.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDietPlan) {
      return res.json({ message: "Diet Plan not found" });
    }
    res.json(updatedDietPlan);
  } catch (error) {
    res.json({ message: "Error updating diet plan", error });
  }
});

// Delete Diet Plan (DELETE)
app.delete("/api/diet-plans/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDietPlan = await DietPlan.findByIdAndDelete(id);
    if (!deletedDietPlan) {
      return res.json({ message: "Diet Plan not found" });
    }
    res.json({ message: "Diet Plan deleted successfully" });
  } catch (error) {
    res.json({ message: "Error deleting diet plan", error });
  }
});

// Trainer Schema
const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true },
  specialization: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const Trainer = mongoose.model("Trainer", trainerSchema);

// Routes
app.get("/api/trainers", async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch trainers" });
  }
});

app.post("/api/trainers", async (req, res) => {
  try {
    const trainer = new Trainer(req.body);
    const savedTrainer = await trainer.save();
    res.status(201).json(savedTrainer);
  } catch (err) {
    res.status(400).json({ error: "Failed to add trainer" });
  }
});

app.put("/api/trainers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrainer = await Trainer.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTrainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json(updatedTrainer);
  } catch (err) {
    res.status(400).json({ error: "Failed to update trainer" });
  }
});

app.delete("/api/trainers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTrainer = await Trainer.findByIdAndDelete(id);
    if (!deletedTrainer) {
      return res.status(404).json({ error: "Trainer not found" });
    }
    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete trainer" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
