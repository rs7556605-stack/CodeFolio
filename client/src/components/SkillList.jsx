import React, { useEffect, useState } from "react";

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
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/skills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch skills"
        );
      }

      setSkills(data.skills || []);

    } catch (error) {
      console.error(
        "Fetch Skills Error:",
        error
      );

      setMessage(error.message);

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
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/skills/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete skill"
        );
      }

      // ========================================
      // REMOVE FROM SKILL LIST
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

      setMessage(
        "Skill deleted successfully ✅"
      );

    } catch (error) {
      console.error(
        "Delete Skill Error:",
        error
      );

      setMessage(error.message);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return <p>Loading skills...</p>;
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="skill-list">

      <h2>Your Skills</h2>

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

      {skills.length === 0 ? (
        <p>No skills found.</p>
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

              <div>

                <h3>
                  {skill.name}
                </h3>

                <span className="skill-category">
                  {skill.category}
                </span>

              </div>

              {/* =================================
                  ACTIONS
              ================================= */}

              <div className="skill-actions">

                {/* EDIT */}

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() =>
                    onEdit(skill)
                  }
                >
                  Edit
                </button>

                {/* DELETE */}

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(skill._id)
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