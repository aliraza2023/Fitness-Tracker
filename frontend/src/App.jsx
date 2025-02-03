import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Component/Login";
import Register from "./Component/Register";
import UDashboard from "./Component/UDashboard";
import AddWorkout from "./Component/AddWorkout";
import AddNutrition from "./Component/AddNutrition";
import DietForm from "./Component/DietForm";
import Trainer from "./Component/Trainer";
import Profile from "./Component/Profile";
import Index from "./Component/Index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/UDashboard" element={<UDashboard />} />
        <Route path="/AddWorkout" element={<AddWorkout />} />
        <Route path="/AddNutrition" element={<AddNutrition />} />
        <Route path="/DietForm" element={<DietForm />} />
        <Route path="/Trainer" element={<Trainer />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
