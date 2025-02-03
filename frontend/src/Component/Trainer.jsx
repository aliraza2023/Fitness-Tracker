import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Trainer() {
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

  const [trainerData, setTrainerData] = useState({
    name: "",
    experience: "",
    specialization: "",
    contact: "",
    email: "",
  });

  const [trainers, setTrainers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/trainers");
        setTrainers(response.data);
        localStorage.setItem("trainers", JSON.stringify(response.data));
      } catch (err) {
        console.error("Error fetching trainer data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainerData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { name, experience, specialization, contact, email } = trainerData;
    if (!name || !experience || !specialization || !contact || !email) {
      setError("All fields are required.");
      return false;
    }
    if (isNaN(contact)) {
      setError("Contact must be numeric.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      let response;
      if (editing) {
        response = await axios.put(
          `http://localhost:3001/api/trainers/${editing._id}`,
          trainerData
        );
        const updatedTrainers = trainers.map((trainer) =>
          trainer._id === editing._id ? response.data : trainer
        );
        setTrainers(updatedTrainers);
        localStorage.setItem("trainers", JSON.stringify(updatedTrainers));
      } else {
        response = await axios.post(
          "http://localhost:3001/api/trainers",
          trainerData
        );
        const updatedTrainers = [...trainers, response.data];
        setTrainers(updatedTrainers);
        localStorage.setItem("trainers", JSON.stringify(updatedTrainers));
      }
      resetForm();
    } catch (err) {
      console.error("Error submitting trainer data:", err);
      setError("Error submitting trainer data.");
    }
  };

  const resetForm = () => {
    setTrainerData({
      name: "",
      experience: "",
      specialization: "",
      contact: "",
      email: "",
    });
    setEditing(null);
    setError("");
  };

  const handleEdit = (trainer) => {
    setTrainerData(trainer);
    setEditing(trainer);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/trainers/${id}`);
      const updatedTrainers = trainers.filter((trainer) => trainer._id !== id);
      setTrainers(updatedTrainers);
      localStorage.setItem("trainers", JSON.stringify(updatedTrainers));
    } catch (err) {
      console.error("Error deleting trainer:", err);
      setError("Error deleting trainer.");
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
                  <button
                    className="dropdown-item"
                    onClick={handleLogout} // Ensure handleLogout is defined in your component
                  >
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Logout
                  </button>
                </div>
              </li>
            </ul>
          </nav>
          <div className="container-fluid">
            <h3 className="mb-4">{editing ? "Edit Trainer" : "Add Trainer"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter Trainer Name"
                  value={trainerData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="experience" className="form-label">
                  Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  className="form-control"
                  placeholder="Enter Experience"
                  value={trainerData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="specialization" className="form-label">
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  className="form-control"
                  placeholder="Enter Specialization"
                  value={trainerData.specialization}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="form-control"
                  placeholder="Enter Contact"
                  value={trainerData.contact}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  value={trainerData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {editing ? "Update Trainer" : "Add Trainer"}
              </button>
            </form>
            <h4 className="mt-5">Trainer List</h4>
            <table className="table table-striped mt-3">
              <thead className="table-dark">
                <tr>
                  <th>S.no</th>
                  <th>Name</th>
                  <th>Experience</th>
                  <th>Specialization</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map((trainer, index) => (
                  <tr key={trainer._id}>
                    <td>{index + 1}</td>
                    <td>{trainer.name}</td>
                    <td>{trainer.experience}</td>
                    <td>{trainer.specialization}</td>
                    <td>{trainer.contact}</td>
                    <td>{trainer.email}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(trainer)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleDelete(trainer._id)}
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

export default Trainer;
