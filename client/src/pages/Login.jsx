
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!formData.email.trim()) {
      setMessage("Please enter your email.");
      return;
    }

    if (!formData.password) {
      setMessage("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed.");
        return;
      }

      if (!data.token || !data.user) {
        setMessage("Login response is missing the token or user data.");
        return;
      }

      // Remove any previously stored account information.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      //
      // Save the newly authenticated account.
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Verify that user data was saved.
      console.log("API user:", data.user);
      console.log(
        "Saved user:",
        JSON.parse(localStorage.getItem("user") || "null")
      );

      setMessage("Login successful!");

      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your CodeFolio account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>

          {message && (
            <p className="auth-message" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;