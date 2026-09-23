import React, { useEffect, useState } from "react";

import ProfileForm from "../components/ProfileForm";
import ProjectForm from "../components/ProjectForm";
import ProjectList from "../components/ProjectList";
import SkillForm from "../components/SkillForm";
import SkillList from "../components/SkillList";
import TemplatePreview from "../components/TemplatePreview";



const Dashboard = () => {
  // ==========================================
  // STATES
  // ==========================================

  const [editProject, setEditProject] = useState(null);
  const [editSkill, setEditSkill] = useState(null);

  const [templateId, setTemplateId] =
    useState("minimalist");

  const [previewUser, setPreviewUser] =
    useState(null);

  const [previewSkills, setPreviewSkills] =
    useState([]);

  const [previewProjects, setPreviewProjects] =
    useState([]);

  const [showPreview, setShowPreview] =
    useState(true);

  // ==========================================
  // REFRESH TRIGGERS
  // ==========================================

  const [projectRefresh, setProjectRefresh] =
    useState(0);

  const [skillRefresh, setSkillRefresh] =
    useState(0);

  // ==========================================
  // REFRESH PREVIEW DATA
  // ==========================================

  const refreshPreviewData = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      // ========================================
      // PROFILE
      // ========================================

      const profileResponse = await fetch(
        "http://localhost:5000/api/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData =
        await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(
          profileData.message ||
            "Failed to fetch profile"
        );
      }

      setPreviewUser(profileData.user);

      setTemplateId(
        profileData.user?.templateId ||
          "minimalist"
      );

      // ========================================
      // PROJECTS
      // ========================================

      const projectsResponse = await fetch(
        "http://localhost:5000/api/projects",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const projectsData =
        await projectsResponse.json();

      if (!projectsResponse.ok) {
        throw new Error(
          projectsData.message ||
            "Failed to fetch projects"
        );
      }

      setPreviewProjects(
        projectsData.projects || []
      );

      // ========================================
      // SKILLS
      // ========================================

      const skillsResponse = await fetch(
        "http://localhost:5000/api/skills",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const skillsData =
        await skillsResponse.json();

      if (!skillsResponse.ok) {
        throw new Error(
          skillsData.message ||
            "Failed to fetch skills"
        );
      }

      setPreviewSkills(
        skillsData.skills || []
      );

      console.log(
        "Preview refreshed successfully ✅"
      );
    } catch (error) {
      console.error(
        "Preview Refresh Error:",
        error
      );
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    refreshPreviewData();
  }, []);

  // ==========================================
  // TEMPLATE CHANGE
  // ==========================================

  const handleTemplateChange = async (
    newTemplateId
  ) => {
    try {
      console.log(
        "Selected Template:",
        newTemplateId
      );

      // ========================================
      // PRO TEMPLATES
      // ========================================

      const premiumTemplates = [
        "cyberpunk",
        "nexus",
        "corporate",
        "glassmorphism",
      ];

      // ========================================
      // PRO CHECK
      // ========================================

      if (
        premiumTemplates.includes(newTemplateId) &&
        previewUser?.role !== "pro"
      ) {
        const templateNames = {
          cyberpunk: "Cyberpunk",
          nexus: "Nexus",
          corporate: "Corporate",
          glassmorphism: "Glassmorphism",
        };

        const templateName =
          templateNames[newTemplateId] ||
          "Premium";

        alert(
          `${templateName} template is available for Pro users only 👑`
        );

        return;
      }

      // ========================================
      // TOKEN CHECK
      // ========================================

      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Session expired. Please login again."
        );

        return;
      }

      // ========================================
      // UPDATE TEMPLATE
      // ========================================

      const response = await fetch(
        "http://localhost:5000/api/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            templateId: newTemplateId,
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Template update failed"
        );
      }

      // ========================================
      // UPDATE LOCAL STATE
      // ========================================

      setTemplateId(newTemplateId);

      setPreviewUser((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          templateId: newTemplateId,
        };
      });

      console.log(
        "Template updated successfully:",
        newTemplateId
      );
    } catch (error) {
      console.error(
        "Template Error:",
        error.message
      );

      alert(error.message);
    }
  };

  // ==========================================
  // DEMO UPGRADE TO PRO
  // ==========================================

  const handleUpgradeToPro = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert(
          "Session expired. Please login again."
        );

        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/profile/upgrade-demo",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to activate Pro"
        );
      }

      alert(
        "Demo Pro activated successfully! 👑"
      );

      await refreshPreviewData();
    } catch (error) {
      console.error(
        "Demo Pro Upgrade Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong"
      );
    }
  };

  // ==========================================
  // VIEW PUBLIC PORTFOLIO
  // ==========================================

  const handleViewPortfolio = () => {
    if (!previewUser?.username) {
      alert(
        "Username not found. Please refresh your profile."
      );

      return;
    }

    window.open(
      `/${previewUser.username}`,
      "_blank"
    );
  };

  // ==========================================
  // OPEN RESUME BUILDER
  // ==========================================

  const handleResumeBuilder = () => {
    window.location.href =
      "/resume-builder";
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  // ==========================================
  // PLAN CHECK
  // ==========================================

  const isProUser =
    previewUser?.role === "pro";

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="dashboard">

      {/* ======================================
          SIDEBAR
      ====================================== */}

      <aside className="dashboard-sidebar">

        <div className="logo">
          CodeFolio
        </div>

        <nav>

          <a href="#profile">
            Profile
          </a>

          <a href="#projects">
            Projects
          </a>

          <a href="#skills">
            Skills
          </a>

          <a href="#template">
            Template
          </a>

          <a href="#preview">
            Preview
          </a>

          {/* RESUME BUILDER */}

          <a
            href="/resume-builder"
            className="sidebar-resume-link"
          >
            Resume Builder
          </a>

        </nav>

      </aside>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="dashboard-main">

        {/* ====================================
            HEADER
        ==================================== */}

        <header className="dashboard-header">

          <div>
            <h1>
              Dashboard
            </h1>

            <p>
              Manage your CodeFolio portfolio
            </p>
          </div>

          {/* HEADER ACTIONS */}

          <div className="dashboard-header-actions">

            {/* PLAN BADGE */}

            <div
              className={`plan-badge ${
                isProUser
                  ? "pro-badge"
                  : "free-badge"
              }`}
            >
              {isProUser
                ? "👑 PRO"
                : "FREE"}
            </div>

            {/* RESUME BUILDER */}

           

            {/* VIEW PORTFOLIO */}

            <button
              type="button"
              className="view-portfolio-btn"
              onClick={
                handleViewPortfolio
              }
            >
              🌐 View Portfolio
            </button>

            {/* LOGOUT */}

            <button
              type="button"
              className="logout-btn"
              onClick={
                handleLogout
              }
            >
              Logout
            </button>

          </div>

        </header>

        {/* ====================================
            PROFILE
        ==================================== */}

        <section
          id="profile"
          className="dashboard-card"
        >

          <ProfileForm
            onProfileUpdated={
              refreshPreviewData
            }
          />

        </section>

        {/* ====================================
            PROJECTS
        ==================================== */}

        <section
          id="projects"
          className="dashboard-card"
        >

          <ProjectForm
            editProject={
              editProject
            }

            onProjectCreated={() => {
              setProjectRefresh(
                (prev) => prev + 1
              );

              refreshPreviewData();
            }}

            onProjectUpdated={() => {
              setEditProject(null);

              setProjectRefresh(
                (prev) => prev + 1
              );

              refreshPreviewData();
            }}

            onCancelEdit={() => {
              setEditProject(null);
            }}
          />

          <hr className="section-divider" />

          <ProjectList
            refreshTrigger={
              projectRefresh
            }

            onProjectDeleted={() => {
              refreshPreviewData();
            }}

            onEdit={(project) => {
              console.log(
                "Dashboard received:",
                project
              );

              setEditProject(
                project
              );

              const projectsSection =
                document.getElementById(
                  "projects"
                );

              if (projectsSection) {
                window.scrollTo({
                  top:
                    projectsSection.offsetTop -
                    20,

                  behavior:
                    "smooth",
                });
              }
            }}
          />

        </section>

        {/* ====================================
            SKILLS
        ==================================== */}

        <section
          id="skills"
          className="dashboard-card"
        >

          <SkillForm
            editSkill={
              editSkill
            }

            onSkillCreated={() => {
              setSkillRefresh(
                (prev) => prev + 1
              );

              refreshPreviewData();
            }}

            onSkillUpdated={() => {
              setEditSkill(null);

              setSkillRefresh(
                (prev) => prev + 1
              );

              refreshPreviewData();
            }}

            onCancelEdit={() => {
              setEditSkill(null);
            }}
          />

          <hr className="section-divider" />

          <SkillList
            refreshTrigger={
              skillRefresh
            }

            onSkillDeleted={() => {
              refreshPreviewData();
            }}

            onEdit={(skill) => {
              console.log(
                "Skill Edit:",
                skill
              );

              setEditSkill(
                skill
              );

              const skillsSection =
                document.getElementById(
                  "skills"
                );

              if (skillsSection) {
                window.scrollTo({
                  top:
                    skillsSection.offsetTop -
                    20,

                  behavior:
                    "smooth",
                });
              }
            }}
          />

        </section>

        {/* ====================================
            TEMPLATE
        ==================================== */}

        <section
          id="template"
          className="dashboard-card"
        >

          <h2>
            Choose Template
          </h2>

          <div className="template-selector">

            {/* MINIMALIST */}

            <button
              type="button"
              className={
                templateId ===
                "minimalist"
                  ? "template-btn active"
                  : "template-btn"
              }
              onClick={() =>
                handleTemplateChange(
                  "minimalist"
                )
              }
            >
              Minimalist
            </button>

            {/* CYBERPUNK */}

            <button
              type="button"
              className={
                templateId ===
                "cyberpunk"
                  ? "template-btn active"
                  : "template-btn"
              }
              onClick={() =>
                handleTemplateChange(
                  "cyberpunk"
                )
              }
            >
              {isProUser
                ? "Cyberpunk"
                : "🔒 Cyberpunk — Pro"}
            </button>

            {/* NEXUS */}

            <button
              type="button"
              className={
                templateId ===
                "nexus"
                  ? "template-btn active"
                  : "template-btn"
              }
              onClick={() =>
                handleTemplateChange(
                  "nexus"
                )
              }
            >
              {isProUser
                ? "Nexus 👑"
                : "🔒 Nexus — Pro"}
            </button>

            {/* CORPORATE */}

            <button
              type="button"
              className={
                templateId ===
                "corporate"
                  ? "template-btn active"
                  : "template-btn"
              }
              onClick={() =>
                handleTemplateChange(
                  "corporate"
                )
              }
            >
              {isProUser
                ? "Corporate 💼"
                : "🔒 Corporate — Pro"}
            </button>

            {/* GLASSMORPHISM */}

            <button
              type="button"
              className={
                templateId ===
                "glassmorphism"
                  ? "template-btn active"
                  : "template-btn"
              }
              onClick={() =>
                handleTemplateChange(
                  "glassmorphism"
                )
              }
            >
              {isProUser
                ? "Glassmorphism ✨"
                : "🔒 Glassmorphism — Pro"}
            </button>

          </div>

          {/* SELECTED TEMPLATE */}

          <p className="template-info">
            Selected template:{" "}

            <strong>
              {templateId}
            </strong>
          </p>

          {/* TEMPLATE DESCRIPTION */}


          {/* PRO UPGRADE */}

          {!isProUser && (
            <div className="pro-upgrade-box">

              <div className="pro-upgrade-content">

                <div className="pro-upgrade-icon">
                  👑
                </div>

                <div>

                  <h3>
                    Upgrade to Pro
                  </h3>

                  <p>
                    Unlock Cyberpunk, Nexus,
                    Corporate, Glassmorphism
                    and additional CodeFolio
                    premium features.
                  </p>

                </div>

              </div>

              <button
                type="button"
                className="pro-upgrade-btn"
                onClick={
                  handleUpgradeToPro
                }
              >
                Upgrade to Pro
              </button>

            </div>
          )}

        </section>

        {/* ====================================
            LIVE PREVIEW
        ==================================== */}

        <section
          id="preview"
          className="dashboard-card template-preview-section"
        >

          <div className="preview-toggle-header">

            <h2>
              Template Preview
            </h2>

            <button
              type="button"
              className="preview-toggle-btn"
              onClick={() =>
                setShowPreview(
                  (prev) => !prev
                )
              }
            >
              {showPreview
                ? "Hide Preview"
                : "Show Preview"}
            </button>

          </div>

          {/* PREVIEW */}

          {showPreview &&
          previewUser ? (

            <TemplatePreview
              templateId={
                templateId
              }

              user={
                previewUser
              }

              skills={
                previewSkills
              }

              projects={
                previewProjects
              }
            />

          ) : showPreview ? (

            <p>
              Loading Preview...
            </p>

          ) : null}

        </section>

      </main>

    </div>
  );
};

export default Dashboard;