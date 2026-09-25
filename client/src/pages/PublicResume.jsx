import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ResumePreview from "../components/ResumePreview";
import API_URL from "../services/api";

import "./PublicResume.css";

const PublicResume = () => {
  const { username } = useParams();

  const [resume, setResume] = useState(null);
  const [owner, setOwner] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH PUBLIC RESUME
  // =========================================================

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        setLoading(true);
        setError("");

        // =====================================================
        // CHECK USERNAME
        // =====================================================

        if (!username) {
          throw new Error(
            "Username is missing."
          );
        }

        // =====================================================
        // CLEAN USERNAME
        // =====================================================

        const cleanUsername =
          username.trim().toLowerCase();

        // =====================================================
        // PUBLIC RESUME API
        // =====================================================

        const response = await fetch(
          `${API_URL}/api/resume/public/${encodeURIComponent(
            cleanUsername
          )}`,
          {
            method: "GET",
          }
        );

        // =====================================================
        // RESPONSE
        // =====================================================

        const data =
          await response.json();

        console.log(
          "Public Resume API Response:",
          data
        );

        // =====================================================
        // API ERROR
        // =====================================================

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Resume not found"
          );
        }

        // =====================================================
        // SAVE RESUME DATA
        // =====================================================

        setResume(
          data.resume || null
        );

        // =====================================================
        // SAVE OWNER DATA
        // =====================================================

        setOwner(
          data.user || null
        );

        // =====================================================
        // BROWSER TITLE
        // =====================================================

        const fullName =
          data.resume?.personalInfo
            ?.fullName ||
          data.user?.name ||
          cleanUsername;

        document.title =
          `${fullName} - Resume | CodeFolio`;

      } catch (error) {
        console.error(
          "Public Resume Error:",
          error
        );

        setError(
          error.message ||
            "Unable to load public resume."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();
  }, [username]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="public-resume-loading">

        <div className="public-loading-card">

          <div className="public-loading-spinner"></div>

          <h2>
            Loading Resume...
          </h2>

          <p>
            Please wait while we load
            the public resume.
          </p>

        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error || !resume) {
    return (
      <div className="public-resume-error">

        <div className="public-error-card">

          <div className="public-error-icon">
            📄
          </div>

          <h1>
            Resume Not Found
          </h1>

          <p>
            {error ||
              "This resume does not exist or is not available."}
          </p>

          <p className="public-error-username">

            Username:{" "}

            <strong>
              {username || "Unknown"}
            </strong>

          </p>

          <a href="/">
            Go to CodeFolio
          </a>

        </div>

      </div>
    );
  }

  // =========================================================
  // PUBLIC RESUME
  // =========================================================

  return (
    <div className="public-resume-page">

      {/* ===================================================
          TOP ACTION BUTTONS
      =================================================== */}

      <div className="public-resume-actions no-print">

        {/* DOWNLOAD / PRINT */}

        <button
          type="button"
          className="public-download-btn"
          onClick={() =>
            window.print()
          }
        >
          📥 Download PDF
        </button>

        <button
          type="button"
          className="public-print-btn"
          onClick={() =>
            window.print()
          }
        >
          🖨️ Print Resume
        </button>

      </div>

      {/* ===================================================
          RESUME PREVIEW

          Same ResumePreview component is used
          by ResumeBuilder Live Preview.
      =================================================== */}

      <div className="public-resume-preview">

        <ResumePreview
          resume={resume}
        />

      </div>

      {/* ===================================================
          FOOTER
      =================================================== */}

      <div className="public-resume-bottom no-print">

        <span>
          {owner?.username ||
            username}
        </span>

        <span>
          CodeFolio
        </span>

      </div>

    </div>
  );
};

export default PublicResume;