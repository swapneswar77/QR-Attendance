import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Login = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students.find((s) => s.id === id && s.name === name);

    if (student) {
      navigate("/scan"); // Redirect to the scanner page
    } else {
      setError("Invalid ID or Name");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>🔐 Student Login</h1>
        <input
          type="text"
          placeholder="Student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleLogin}>Login</button>
        <p>
          New student? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
