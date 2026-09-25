import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../services/api";

const Register = () => {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });

  // ==========================================
  // UI STATES
  // ==========================================

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE REGISTER
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // ========================================
      // BASIC VALIDATION
      // ========================================

      if (
        !formData.username.trim() ||
        !formData.email.trim() ||
        !formData.password.trim()
      ) {
        throw new Error(
          "Username, email and password are required."
        );
      }

      if (formData.password.length < 6) {
        throw new Error(
          "Password must be at least 6 characters."
        );
      }

      // ========================================
      // USERNAME VALIDATION
      // ========================================

      const usernameRegex =
        /^[a-zA-Z0-9_-]+$/;

      if (
        !usernameRegex.test(
          formData.username.trim()
        )
      ) {
        throw new Error(
          "Username can contain only letters, numbers, underscore and hyphen."
        );
      }

      // ========================================
      // REGISTER API
      // ========================================

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username:
              formData.username.trim(),

            email:
              formData.email.trim(),

            password:
              formData.password,

            name:
              formData.name.trim(),
          }),
        }
      );

      // ========================================
      // RESPONSE
      // ========================================

      const data =
        await response.json();

      console.log(
        "Register API Response:",
        data
      );

      // ========================================
      // API ERROR
      // ========================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Registration failed."
        );
      }

      // ========================================
      // SUCCESS
      // ========================================

      setMessage(
        "Registration successful! Redirecting to login..."
      );

      setError("");

      // ========================================
      // RESET FORM
      // ========================================

      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
      });

      // ========================================
      // REDIRECT TO LOGIN
      // ========================================

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(
        "Register Error:",
        error
      );

      setError(
        error.message ||
          "Something went wrong."
      );

      setMessage("");

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* ====================================
            TITLE
        ==================================== */}

        <div className="auth-header">

          <h1>
            Create Account
          </h1>

          <p>
            Create your CodeFolio account
          </p>

        </div>

        {/* ====================================
            REGISTER FORM
        ==================================== */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* ==================================
              USERNAME
          ================================== */}

          <div className="form-group">

            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              autoComplete="username"
              required
            />

            <small>
              This will be used in your
              portfolio URL.
            </small>

          </div>

          {/* ==================================
              NAME
          ================================== */}

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
            />

          </div>

          {/* ==================================
              EMAIL
          ================================== */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              autoComplete="email"
              required
            />

          </div>

          {/* ==================================
              PASSWORD
          ================================== */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <small>
              Minimum 6 characters.
            </small>

          </div>

          {/* ==================================
              ERROR
          ================================== */}

          {error && (
            <p className="auth-error">
              {error}
            </p>
          )}

          {/* ==================================
              SUCCESS
          ================================== */}

          {message && (
            <p className="auth-success">
              {message}
            </p>
          )}

          {/* ==================================
              SUBMIT
          ================================== */}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        {/* ====================================
            LOGIN LINK
        ==================================== */}

        <div className="auth-footer">

          <p>
            Already have an account?
          </p>

          <Link to="/login">
            Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;