import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ==========================================
  // UI STATES
  // ==========================================

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous message
    setMessage("");

    // Start loading
    setLoading(true);

    try {
      // ========================================
      // VALIDATION
      // ========================================

      if (!formData.email.trim()) {
        setMessage("Please enter your email.");
        setLoading(false);
        return;
      }

      if (!formData.password) {
        setMessage("Please enter your password.");
        setLoading(false);
        return;
      }

      // ========================================
      // LOGIN API
      // ========================================

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        }
      );

      // ========================================
      // GET RESPONSE
      // ========================================

      const data =
        await response.json();

      console.log(
        "Login API Response:",
        data
      );

      // ========================================
      // API ERROR
      // ========================================

      if (!response.ok) {
        setMessage(
          data.message ||
            "Login failed"
        );

        setLoading(false);
        return;
      }

      // ========================================
      // TOKEN CHECK
      // ========================================

      if (!data.token) {
        setMessage(
          "Login successful, but authentication token was not received."
        );

        setLoading(false);
        return;
      }

      // ========================================
      // SAVE TOKEN
      // ========================================

      localStorage.setItem(
        "token",
        data.token
      );

      // ========================================
      // SUCCESS MESSAGE
      // ========================================

      setMessage(
        "Login successful ✅"
      );

      // ========================================
      // REDIRECT TO DASHBOARD
      // ========================================

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (error) {
      // ========================================
      // NETWORK / SERVER ERROR
      // ========================================

      console.error(
        "Login Error:",
        error
      );

      setMessage(
        "Server connection failed ❌"
      );

    } finally {
      // ========================================
      // STOP LOADING
      // ========================================

      setLoading(false);
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* ====================================
            TITLE
        ==================================== */}

        <h1>
          Welcome Back
        </h1>

        <p className="auth-subtitle">
          Login to your CodeFolio account
        </p>

        {/* ====================================
            LOGIN FORM
        ==================================== */}

        <form
          onSubmit={handleSubmit}
        >

          {/* ==================================
              EMAIL
          ================================== */}

          <div className="auth-field">

            <label htmlFor="email">
              Email
            </label>

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

          {/* ==================================
              PASSWORD
          ================================== */}

          <div className="auth-field">

            <label htmlFor="password">
              Password
            </label>

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

          {/* ==================================
              MESSAGE
          ================================== */}

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

          {/* ==================================
              LOGIN BUTTON
          ================================== */}

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        {/* ====================================
            REGISTER LINK
        ==================================== */}

        <p className="auth-footer-text">

          Don't have an account?{" "}

          <Link to="/register">
            Create Account
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;