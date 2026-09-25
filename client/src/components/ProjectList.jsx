import React, { useEffect, useState } from "react";
import API_URL from "../services/api";

const ProjectList = ({
  onEdit,
  onProjectDeleted,
  refreshTrigger,
}) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ==========================================
  // GET PROJECTS
  // ==========================================
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${API_URL}/api/projects`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Projects API Response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch projects"
        );
      }

      // ==========================================
      // UPDATE PROJECT LIST
      // ==========================================
      setProjects(data.projects || []);
    } catch (error) {
      console.error(
        "Fetch Projects Error:",
        error
      );

      setMessage(
        error.message || "Failed to fetch projects"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD + REFRESH AFTER ADD / UPDATE
  // ==========================================
  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  // ==========================================
  // DELETE PROJECT
  // ==========================================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setMessage("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(
        "Delete Project Response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to delete project"
        );
      }

      // ==========================================
      // REMOVE PROJECT FROM CURRENT LIST
      // ==========================================
      setProjects((prevProjects) =>
        prevProjects.filter(
          (project) => project._id !== id
        )
      );

      // ==========================================
      // REFRESH LIVE PREVIEW
      // ==========================================
      if (onProjectDeleted) {
        await onProjectDeleted();
      }

      setMessage(
        "Project deleted successfully ✅"
      );
    } catch (error) {
      console.error(
        "Delete Project Error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to delete project"
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="project-list">
        <h2>Your Projects</h2>
        <p>Loading projects...</p>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="project-list">

      {/* ========================================
          TITLE
      ======================================== */}
      <h2>Your Projects</h2>

      {/* ========================================
          MESSAGE
      ======================================== */}
      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

      {/* ========================================
          NO PROJECT
      ======================================== */}
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="projects-grid">

          {projects.map((project) => (
            <div
              className="project-item"
              key={project._id}
            >

              {/* ==================================
                  PROJECT SCREENSHOT
              ================================== */}
              {project.screenshot && (
                <img
                  src={project.screenshot}
                  alt={project.title}
                  className="project-image"
                />
              )}

              {/* ==================================
                  PROJECT TITLE
              ================================== */}
              <h3>
                {project.title}
              </h3>

              {/* ==================================
                  DESCRIPTION
              ================================== */}
              <p>
                {project.description}
              </p>

              {/* ==================================
                  TECH STACK
              ================================== */}
              {project.techStack &&
                project.techStack.length > 0 && (
                  <div className="tech-stack">

                    {project.techStack.map(
                      (tech, index) => (
                        <span key={index}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>
                )}

              {/* ==================================
                  PROJECT LINKS
              ================================== */}
              {(project.repoLink ||
                project.liveLink) && (
                <div className="project-links">

                  {/* ==================================
                      GITHUB
                  ================================== */}
                  {project.repoLink && (
                    <a
                      href={project.repoLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  )}

                  {/* ==================================
                      LIVE DEMO
                  ================================== */}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo
                    </a>
                  )}

                </div>
              )}

              {/* ==================================
                  EDIT / DELETE
              ================================== */}
              <div className="project-actions">

                {/* ==================================
                    EDIT
                ================================== */}
                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => {
                    console.log(
                      "Edit clicked:",
                      project
                    );

                    if (onEdit) {
                      onEdit(project);
                    }
                  }}
                >
                  Edit
                </button>

                {/* ==================================
                    DELETE
                ================================== */}
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(project._id)
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

export default ProjectList;