import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function DietForm() {
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

  const [formData, setFormData] = useState({
    dietPlanName: "",
    caloriesTarget: "",
    mealType: "",
    specialNotes: "",
  });

  const [error, setError] = useState("");
  const [dietPlans, setDietPlans] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const savedDietPlans = JSON.parse(localStorage.getItem("dietPlans")) || [];
    setDietPlans(savedDietPlans);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "caloriesTarget" && error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.caloriesTarget || parseInt(formData.caloriesTarget) <= 0) {
      setError("Calories Target must be a positive number.");
      return;
    }

    try {
      let response;
      if (editing) {
        response = await axios.put(
          `http://localhost:3001/api/diet-plans/${editing._id}`,
          formData
        );
        const updatedDietPlans = dietPlans.map((plan) =>
          plan._id === editing._id ? response.data : plan
        );
        setDietPlans(updatedDietPlans);
        alert("Diet Plan Updated Successfully!");
      } else {
        response = await axios.post(
          "http://localhost:3001/api/diet-plans",
          formData
        );
        const updatedDietPlans = [...dietPlans, response.data];
        setDietPlans(updatedDietPlans);
        alert("Diet Plan Submitted Successfully!");
      }

      localStorage.setItem("dietPlans", JSON.stringify(dietPlans));

      resetForm();
    } catch (err) {
      setError("Error submitting diet plan.");
    }
  };

  const resetForm = () => {
    setFormData({
      dietPlanName: "",
      caloriesTarget: "",
      mealType: "",
      specialNotes: "",
    });
    setError("");
    setEditing(null);
  };

  const handleEdit = (dietPlan) => {
    setFormData({
      dietPlanName: dietPlan.dietPlanName,
      caloriesTarget: dietPlan.caloriesTarget,
      mealType: dietPlan.mealType,
      specialNotes: dietPlan.specialNotes,
    });
    setEditing(dietPlan);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/diet-plans/${id}`);
      const updatedDietPlans = dietPlans.filter((plan) => plan._id !== id);
      setDietPlans(updatedDietPlans);
      localStorage.setItem("dietPlans", JSON.stringify(updatedDietPlans));
      alert("Diet Plan Deleted Successfully!");
    } catch (err) {
      alert("Error deleting diet plan.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };

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
                  to="#"
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
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="/" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Logout
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
          <div className="container-fluid">
            <h3 className="mb-4">Add Diet Plan</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="dietPlanName" className="form-label">
                  Diet Plan Name
                </label>
                <input
                  type="text"
                  id="dietPlanName"
                  name="dietPlanName"
                  className="form-control"
                  placeholder="Enter diet plan name"
                  value={formData.dietPlanName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="caloriesTarget" className="form-label">
                  Calories Target
                </label>
                <input
                  type="number"
                  id="caloriesTarget"
                  name="caloriesTarget"
                  className="form-control"
                  placeholder="Enter calories target"
                  value={formData.caloriesTarget}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="mealType" className="form-label">
                  Meal Type
                </label>
                <select
                  id="mealType"
                  name="mealType"
                  className="form-control"
                  value={formData.mealType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select meal type</option>
                  <option value="Breakfast">Breakfast</option>
                  <option value="Lunch">Lunch</option>
                  <option value="Dinner">Dinner</option>
                  <option value="Snack">Snack</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="specialNotes" className="form-label">
                  Special Notes
                </label>
                <textarea
                  id="specialNotes"
                  name="specialNotes"
                  className="form-control"
                  placeholder="Enter any additional notes"
                  value={formData.specialNotes}
                  onChange={handleChange}
                  rows="3"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {editing ? "Update Diet Plan" : "Submit Diet Plan"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={resetForm}
              >
                Reset
              </button>
            </form>
            <table className="table table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th>S.no</th>
                  <th>Diet Plan Name</th>
                  <th>Calories Target</th>
                  <th>Meal Type</th>
                  <th>Special Notes</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dietPlans.map((dietPlan, index) => (
                  <tr key={dietPlan._id}>
                    <td>{index + 1}</td>
                    <td>{dietPlan.dietPlanName}</td>
                    <td>{dietPlan.caloriesTarget}</td>
                    <td>{dietPlan.mealType}</td>
                    <td>{dietPlan.specialNotes}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(dietPlan)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleDelete(dietPlan._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DietForm;
