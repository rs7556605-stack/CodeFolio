import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const SkillList = ({
  onEdit,
  onSkillDeleted,
  refreshTrigger,
}) => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ==========================================
  // GET SKILLS
  // ==========================================

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setMessage("");

      // ========================================
      // GET TOKEN
      // ========================================

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Session expired. Please login again."
        );
      }

      // ========================================
      // API REQUEST
      // ========================================

      const response = await fetch(
        `${API_URL}/api/skills`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ========================================
      // RESPONSE
      // ========================================

      const data = await response.json();

      console.log(
        "Skills API Response:",
        data
      );

      // ========================================
      // API ERROR
      // ========================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch skills"
        );
      }

      // ========================================
      // UPDATE SKILLS
      // ========================================

      setSkills(data.skills || []);

    } catch (error) {
      console.error(
        "Fetch Skills Error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to fetch skills"
      );

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD + REFRESH
  // ==========================================

  useEffect(() => {
    fetchSkills();
  }, [refreshTrigger]);

  // ==========================================
  // DELETE SKILL
  // ==========================================

  const handleDelete = async (id) => {
    // ========================================
    // CONFIRM DELETE
    // ========================================

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this skill?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setMessage("");

      // ========================================
      // GET TOKEN
      // ========================================

      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Session expired. Please login again."
        );
      }

      // ========================================
      // DELETE API REQUEST
      // ========================================

      const response = await fetch(
        `${API_URL}/api/skills/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // ========================================
      // RESPONSE
      // ========================================

      const data =
        await response.json();

      console.log(
        "Delete Skill Response:",
        data
      );

      // ========================================
      // API ERROR
      // ========================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete skill"
        );
      }

      // ========================================
      // REMOVE FROM CURRENT LIST
      // ========================================

      setSkills((prevSkills) =>
        prevSkills.filter(
          (skill) => skill._id !== id
        )
      );

      // ========================================
      // REFRESH LIVE PREVIEW
      // ========================================

      if (onSkillDeleted) {
        await onSkillDeleted();
      }

      // ========================================
      // SUCCESS MESSAGE
      // ========================================

      setMessage(
        "Skill deleted successfully ✅"
      );

    } catch (error) {
      console.error(
        "Delete Skill Error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to delete skill"
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="skill-list">
        <h2>Your Skills</h2>

        <p>
          Loading skills...
        </p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="skill-list">

      {/* ========================================
          TITLE
      ======================================== */}

      <h2>
        Your Skills
      </h2>

      {/* ========================================
          MESSAGE
      ======================================== */}

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

      {/* ========================================
          NO SKILLS
      ======================================== */}

      {skills.length === 0 ? (
        <p>
          No skills found.
        </p>
      ) : (

        <div className="skills-grid">

          {skills.map((skill) => (
            <div
              className="skill-item"
              key={skill._id}
            >

              {/* =================================
                  SKILL INFORMATION
              ================================= */}

              <div className="skill-info">

                {/* SKILL NAME */}

                <h3>
                  {skill.name}
                </h3>

                {/* CATEGORY */}

                <span className="skill-category">
                  {skill.category}
                </span>

                {/* LEVEL */}

                {skill.level && (
                  <span className="skill-level">
                    {skill.level}
                  </span>
                )}

              </div>

              {/* =================================
                  ACTIONS
              ================================= */}

              <div className="skill-actions">

                {/* EDIT */}

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => {
                    console.log(
                      "Edit Skill:",
                      skill
                    );

                    if (onEdit) {
                      onEdit(skill);
                    }
                  }}
                >
                  Edit
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(
                      skill._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default SkillList;