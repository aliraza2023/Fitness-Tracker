import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function AddNutrition() {
  const [formData, setFormData] = useState({
    gender: "",
    weight: "",
    height: "",
    age: "",
    activityLevel: "",
  });

  const [nutritions, setNutritions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editNutritionId, setEditNutritionId] = useState(null);

  const fetchNutritions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/nutrition`);
      setNutritions(response.data);
    } catch (err) {
      console.error("Error fetching nutritions:", err);
      setError("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNutritions();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(
          `http://localhost:3001/nutrition/${editNutritionId}`,
          formData
        );
        alert("Nutrition updated successfully!");
      } else {
        await axios.post(`http://localhost:3001/nutrition`, formData);
        alert("Nutrition added successfully!");
      }
      resetForm();
      fetchNutritions();
    } catch (err) {
      console.error("Failed to submit nutrition:", err);
      setError("Failed to submit data.");
    }
  };

  const handleEdit = (nutrition) => {
    setFormData({
      gender: nutrition.gender,
      weight: nutrition.weight,
      height: nutrition.height,
      age: nutrition.age,
      activityLevel: nutrition.activityLevel,
    });
    setEditMode(true);
    setEditNutritionId(nutrition._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this nutrition?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/nutrition/${id}`);
      alert("Nutrition deleted successfully!");
      fetchNutritions();
    } catch (err) {
      console.error("Failed to delete nutrition:", err);
      setError("Failed to delete data.");
    }
  };

  const resetForm = () => {
    setFormData({
      gender: "",
      weight: "",
      height: "",
      age: "",
      activityLevel: "",
    });
    setEditMode(false);
    setEditNutritionId(null);
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
        const response = await axios.get("http://localhost:3001/user/profile"); // Replace with your API endpoint
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
            <div className="form-container">
              <h3 className="text-left mb-4">
                {editMode ? "Edit nutritions" : "Add nutritions"}
              </h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label for="gender" class="form-label">
                      Gender
                    </label>
                    <select
                      id="gender"
                      className="form-control"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="col">
                    <label for="weight" class="form-label">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      id="weight"
                      className="form-control"
                      placeholder="Enter your weight"
                      value={formData.weight}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label for="height" class="form-label">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      id="height"
                      className="form-control"
                      placeholder="Enter your height"
                      value={formData.height}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col">
                    <label for="age" class="form-label">
                      Age (years)
                    </label>
                    <input
                      type="text"
                      id="age"
                      className="form-control"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="activityLevel" class="form-label">
                    Activity Level
                  </label>
                  <select
                    id="activityLevel"
                    className="form-control"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="" selected disabled>
                      Select Activity Level
                    </option>
                    <option value="1.2">
                      Sedentary (little or no exercise)
                    </option>
                    <option value="1.375">
                      Lightly active (light exercise/sports 1-3 days/week)
                    </option>
                    <option value="1.55">
                      Moderately active (moderate exercise/sports 3-5 days/week)
                    </option>
                    <option value="1.725">
                      Very active (hard exercise/sports 6-7 days/week)
                    </option>
                    <option value="1.9">
                      Super active (very hard exercise/physical job)
                    </option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  {editMode ? "Update" : "Submit"}
                </button>
                {editMode && (
                  <button
                    type="button"
                    className="btn btn-secondary ml-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </form>
            </div>
            <div className="table-container mt-3">
              {loading ? (
                <div>Loading...</div>
              ) : (
                <table className="table table-light table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">S.no</th>
                      <th scope="col">gender</th>
                      <th scope="col">weight</th>
                      <th scope="col">height</th>
                      <th scope="col">age</th>
                      <th scope="col">activityLevel</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritions.map((nutritionsItem, index) => (
                      <tr key={nutritionsItem._id}>
                        <td>{index + 1}</td>
                        <td>{nutritionsItem.gender}</td>
                        <td>{nutritionsItem.weight}</td>
                        <td>{nutritionsItem.height}</td>
                        <td>{nutritionsItem.age}</td>
                        <td>{nutritionsItem.activityLevel}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleEdit(nutritionsItem)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger ml-2"
                            onClick={() => handleDelete(nutritionsItem._id)}
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
    </div>
  );
}

export default AddNutrition;
