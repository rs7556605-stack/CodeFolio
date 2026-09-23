import React from "react";
import "./Corporate.css";
import ContactForm from "../../components/ContactForm";

const Corporate = ({ data }) => {
  return (
    <div className="corporate">

      {/* =========================
          HEADER
      ========================== */}
      <header className="corporate-header">

        <div className="corporate-header-inner">

          <div className="corporate-logo">
            CodeFolio
          </div>

          <div className="corporate-username">
            @{data?.username}
          </div>

        </div>

      </header>


      {/* =========================
          HERO
      ========================== */}
      <section className="corporate-hero">

        <div className="corporate-hero-inner">

          <div className="corporate-hero-content">

            <span className="corporate-eyebrow">
              PROFESSIONAL PORTFOLIO
            </span>

            <h1>
              {data?.name || "Your Name"}
            </h1>

            {data?.profession && (
              <h2>
                {data.profession}
              </h2>
            )}

            <p className="corporate-bio">
              {data?.bio ||
                "Welcome to my professional portfolio."}
            </p>


            {/* HERO ACTIONS */}
            <div className="corporate-actions">

              {data?.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="corporate-primary-btn"
                >
                  View Resume
                </a>
              )}

              <a
                href="#corporate-projects"
                className="corporate-secondary-btn"
              >
                View Projects
              </a>

            </div>


            {/* SOCIAL LINKS */}
            <div className="corporate-socials">

              {data?.socialLinks?.github && (
                <a
                  href={data.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {data?.socialLinks?.linkedin && (
                <a
                  href={data.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

              {data?.socialLinks?.twitter && (
                <a
                  href={data.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              )}

              {data?.socialLinks?.website && (
                <a
                  href={data.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              )}

            </div>

          </div>


          {/* PROFILE IMAGE */}
          <div className="corporate-profile">

            {data?.profileImage ? (
              <img
                src={data.profileImage}
                alt={data?.name || "Profile"}
                className="corporate-profile-image"
              />
            ) : (
              <div className="corporate-profile-placeholder">
                {data?.name?.charAt(0) || "C"}
              </div>
            )}

          </div>

        </div>

      </section>


      {/* =========================
          QUICK INFO
      ========================== */}
      <section className="corporate-info">

        <div className="corporate-info-card">

          <span>
            PROJECTS
          </span>

          <strong>
            {data?.projects?.length || 0}
          </strong>

        </div>


        <div className="corporate-info-card">

          <span>
            SKILLS
          </span>

          <strong>
            {data?.skills?.length || 0}
          </strong>

        </div>


        <div className="corporate-info-card">

          <span>
            STATUS
          </span>

          <strong>
            AVAILABLE
          </strong>

        </div>

      </section>


      {/* =========================
          ABOUT
      ========================== */}
      <section className="corporate-section">

        <div className="corporate-section-heading">

          <span>
            01 / ABOUT
          </span>

          <h2>
            Professional Profile
          </h2>

        </div>

        <div className="corporate-about">

          <p>
            {data?.bio ||
              "I am a passionate professional focused on building useful, modern and reliable digital experiences."}
          </p>

        </div>

      </section>


      {/* =========================
          SKILLS
      ========================== */}
      <section className="corporate-section">

        <div className="corporate-section-heading">

          <span>
            02 / EXPERTISE
          </span>

          <h2>
            Skills & Technologies
          </h2>

        </div>


        <div className="corporate-skills">

          {data?.skills?.length > 0 ? (

            data.skills.map((skill) => (

              <div
                className="corporate-skill"
                key={skill._id}
              >

                <div className="corporate-skill-header">

                  <h3>
                    {skill.name}
                  </h3>

                  <span>
                    {skill.level || "Beginner"}
                  </span>

                </div>

                <p>
                  {skill.category}
                </p>

              </div>

            ))

          ) : (

            <p className="corporate-empty">
              No skills added yet.
            </p>

          )}

        </div>

      </section>


      {/* =========================
          PROJECTS
      ========================== */}
      <section
        className="corporate-section"
        id="corporate-projects"
      >

        <div className="corporate-section-heading">

          <span>
            03 / PROJECTS
          </span>

          <h2>
            Selected Work
          </h2>

        </div>


        <div className="corporate-projects">

          {data?.projects?.length > 0 ? (

            data.projects.map((project, index) => (

              <article
                className="corporate-project"
                key={project._id}
              >

                {/* PROJECT NUMBER */}
                <div className="corporate-project-number">
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* SCREENSHOT */}
                <div className="corporate-project-image">

                  {project.screenshot ? (

                    <img
                      src={project.screenshot}
                      alt={project.title}
                    />

                  ) : (

                    <div className="corporate-project-placeholder">
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </div>

                  )}

                </div>


                {/* PROJECT CONTENT */}
                <div className="corporate-project-content">

                  <h3>
                    {project.title}
                  </h3>


                  {/* CATEGORY */}
                  {project.category && (
                    <span className="corporate-project-category">
                      {project.category}
                    </span>
                  )}


                  <p>
                    {project.description}
                  </p>


                  {/* TECH STACK */}
                  <div className="corporate-tech">

                    {project.techStack?.map(
                      (tech, techIndex) => (
                        <span key={techIndex}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>


                  {/* LINKS */}
                  <div className="corporate-project-links">

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub →
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo →
                      </a>
                    )}

                  </div>

                </div>

              </article>

            ))

          ) : (

            <p className="corporate-empty">
              No projects added yet.
            </p>

          )}

        </div>

      </section>


      {/* =========================
          CONTACT
      ========================== */}
      <section className="corporate-contact">

        <div className="corporate-contact-inner">

          <div className="corporate-contact-text">

            <span>
              04 / CONTACT
            </span>

            <h2>
              Let's work
              <br />
              together.
            </h2>

            <p>
              Have an opportunity, project or
              idea? Send me a message.
            </p>

          </div>


          <div className="corporate-contact-form">

            <ContactForm
              username={data?.username}
            />

          </div>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="corporate-footer">

        <div>
          © {new Date().getFullYear()}{" "}
          {data?.name || "Your Name"}
        </div>

        

        <div>
          @{data?.username}
        </div>

      </footer>

    </div>
  );
};

export default Corporate;