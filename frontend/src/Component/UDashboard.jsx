import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";
import numeral from "numeral";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [userData, setUserData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/profile");
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const [workouts, setWorkouts] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalWorkouts, setTotalWorkouts] = useState(0);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:3001/workouts");
        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };

    fetchWorkouts();
  }, []);

  const calculateTotalWorkout = () => {
    const calories = workouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );
    const time = workouts.reduce(
      (total, workout) => total + workout.duration,
      0
    );
    const workoutCount = workouts.length;

    setTotalCalories(calories);
    setTotalTime(time);
    setTotalWorkouts(workoutCount);
  };

  useEffect(() => {
    if (workouts.length > 0) {
      calculateTotalWorkout();
    }
  }, [workouts]);

  const areaChartData = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Calories Burned",
        data: [200, 300, 250, 400, 350, 300, 200],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.4,
      },
    ],
  };

  const pieChartData = {
    labels: ["Back", "Shoulder", "Abs", "Legs"],
    datasets: [
      {
        data: [20, 30, 25, 25],
        backgroundColor: ["#007bff", "#28a745", "#dc3545", "#17a2b8"],
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <>
      <div id="wrapper">
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/UDashboard"
          >
            <div className="sidebar-brand-text mx-3">Fitness Tracker</div>
          </Link>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" to="/UDashboard">
              <i className="fas fa-fw fa-tachometer-alt" />
              <span>Dashboard</span>
            </Link>
          </li>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" to="/AddWorkout">
              <i className="fas fa-fw fa-dumbbell" />
              <span>Workouts</span>
            </Link>
          </li>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" to="/AddNutrition">
              <i className="fas fa-fw fa-apple-alt" />
              <span>Nutrition</span>
            </Link>
          </li>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" to="/DietForm">
              <i className="fas fa-fw fa-utensils" />
              <span>Diet</span>
            </Link>
          </li>
          <hr className="sidebar-divider my-0" />
          <li className="nav-item active">
            <Link className="nav-link" to="/Trainer">
              <i className="fas fa-dumbbell" />
              <span>Trainer</span>
            </Link>
          </li>
        </ul>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars" />
              </button>
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow mx-1">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="alertsDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge badge-danger badge-counter">3+</span>
                  </Link>
                  <div
                    className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="alertsDropdown"
                  >
                    <h6 className="dropdown-header">Alerts Center</h6>
                    <Link
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <div className="mr-3">
                        <div className="icon-circle bg-primary">
                          <i className="fas fa-file-alt text-white"></i>
                        </div>
                      </div>
                      <div>
                        <div className="small text-gray-500">
                          December 12, 2019
                        </div>
                        <span className="font-weight-bold">
                          A new monthly report is ready to download!
                        </span>
                      </div>
                    </Link>
                    <Link
                      className="dropdown-item text-center small text-gray-500"
                      href="#"
                    >
                      Show All Alerts
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown no-arrow">
                  <Link
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                      {userData.name}
                    </span>
                    <img
                      className="img-profile rounded-circle"
                      src="/assets/img/undraw_profile.jpg"
                      alt="User Profile"
                    />
                  </Link>
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Link className="dropdown-item" to="/Profile">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link
                      className="dropdown-item"
                      to="/"
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </Link>
                  </div>
                </li>
              </ul>
            </nav>
            <div className="container-fluid">
              <div className="row">
                {/* Calories Burned Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Calories Burned
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numeral(totalCalories).format("0.00")} (Calories)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Workouts Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Workouts Summary
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {totalWorkouts} Workouts
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Time Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Workout Time
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numeral(totalTime).format("0,0")} minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Time Card */}
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            Total Nutrition
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numeral(totalTime).format("0,0")} minutes
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {/* Area Chart */}
                <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Weekly Calories Burned
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-area">
                        <Line
                          data={areaChartData}
                          options={{ maintainAspectRatio: false }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Weekly Workout Distribution
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="chart-pie pt-4 pb-2">
                        <Pie data={pieChartData} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright © FitnessTracker 2024</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
