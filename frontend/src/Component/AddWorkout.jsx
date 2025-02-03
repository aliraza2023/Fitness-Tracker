import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddWorkout() {
  const [formData, setFormData] = useState({
    workoutName: "",
    sets: "",
    weight: "",
    duration: "",
    workoutType: "cardio",
    exerciseType: "running",
    intensity: "low",
  });

  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editWorkoutId, setEditWorkoutId] = useState(null);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/workouts");
      setWorkouts(response.data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
      setError("Failed to load workouts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const calculateCaloriesBurned = (workout) => {
    const METValues = {
      running: 7.5,
      cycling: 6.0,
      swimming: 7.0,
    };
    const MET = METValues[workout.exerciseType] || 7.0;
    const weightInKg = parseFloat(workout.weight);
    const durationInHours = parseFloat(workout.duration) / 60;
    return (MET * weightInKg * durationInHours).toFixed(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/workouts/${editWorkoutId}`,
          formData
        );
        alert("Workout updated successfully!");
      } else {
        await axios.post("http://localhost:3001/workouts", formData);
        alert("Workout added successfully!");
      }
      resetForm();
      fetchWorkouts();
    } catch (error) {
      console.error("Failed to submit workout:", error);
      setError("Failed to submit workout. Please try again.");
    }
  };

  const handleEdit = (workout) => {
    setFormData({
      workoutName: workout.workoutName,
      sets: workout.sets,
      weight: workout.weight,
      duration: workout.duration,
      workoutType: workout.workoutType,
      exerciseType: workout.exerciseType,
      intensity: workout.intensity,
    });
    setEditMode(true);
    setEditWorkoutId(workout._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/workouts/${id}`);
      alert("Workout deleted successfully!");
      setWorkouts(workouts.filter((workout) => workout._id !== id));
    } catch (error) {
      console.error("Failed to delete workout:", error);
      setError("Failed to delete workout. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      workoutName: "",
      sets: "",
      weight: "",
      duration: "",
      workoutType: "cardio",
      exerciseType: "running",
      intensity: "low",
    });
    setEditMode(false);
    setEditWorkoutId(null);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

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

  return (
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
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
          <div className="container-fluid">
            <h3 className="text-left mb-4">
              {editMode ? "Edit Workout" : "Add Workout"}
            </h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="workoutName" className="form-label">
                    Workout Name
                  </label>
                  <input
                    type="text"
                    id="workoutName"
                    className="form-control"
                    placeholder="Workout Name"
                    value={formData.workoutName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="sets" className="form-label">
                    Sets
                  </label>
                  <input
                    type="number"
                    id="sets"
                    className="form-control"
                    placeholder="Sets"
                    value={formData.sets}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label htmlFor="weight" className="form-label">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    id="weight"
                    className="form-control"
                    placeholder="Weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col">
                  <label htmlFor="duration" className="form-label">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    id="duration"
                    className="form-control"
                    placeholder="Duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exerciseType" className="form-label">
                  Exercise Type
                </label>
                <select
                  id="exerciseType"
                  className="form-control"
                  value={formData.exerciseType}
                  onChange={handleChange}
                  required
                >
                  <option value="running">Running</option>
                  <option value="cycling">Cycling</option>
                  <option value="swimming">Swimming</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="intensity" className="form-label">
                  Workout Intensity
                </label>
                <select
                  id="intensity"
                  className="form-control"
                  value={formData.intensity}
                  onChange={handleChange}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button type="submit" className="btn btn-primary">
                {editMode ? "Update Workout" : "Add Workout"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={resetForm}
              >
                Reset
              </button>
            </form>

            <h4 className="mt-5">Workouts List</h4>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table table-striped mt-3">
                <thead className="table-dark">
                  <tr>
                    <th>S.no</th>
                    <th>Workout Name</th>
                    <th>Sets</th>
                    <th>Weight</th>
                    <th>Duration</th>
                    <th>Calories Burned</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout._id}>
                      <td>{index + 1}</td>
                      <td>{workout.workoutName}</td>
                      <td>{workout.sets}</td>
                      <td>{workout.weight}</td>
                      <td>{workout.duration} min</td>
                      <td>{calculateCaloriesBurned(workout)} kcal</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(workout)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ml-2"
                          onClick={() => handleDelete(workout._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddWorkout;
