import React from "react";
import "./Glassmorphism.css";
import ContactForm from "../../components/ContactForm";

const Glassmorphism = ({ data }) => {
  const user = data || {};
  const projects = user.projects || [];
  const skills = user.skills || [];

  return (
    <div className="glass-portfolio">

      {/* ================= NAVBAR ================= */}
      <header className="glass-header">
        <div className="glass-header-inner">
          <div className="glass-logo">
            Code<span>Folio</span>
          </div>

          <nav className="glass-nav">
            <a href="#glass-about">About</a>
            <a href="#glass-skills">Skills</a>
            <a href="#glass-projects">Projects</a>
            <a href="#glass-contact">Contact</a>
          </nav>

          <div className="glass-username">
            @{user.username || "username"}
          </div>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="glass-hero">
        <div className="glass-orb glass-orb-one"></div>
        <div className="glass-orb glass-orb-two"></div>
        <div className="glass-orb glass-orb-three"></div>

        <div className="glass-hero-card">

          <div className="glass-hero-content">
            <div className="glass-status">
              <span className="glass-status-dot"></span>
              Available for opportunities
            </div>

            <p className="glass-small-title">
              HELLO, I'M
            </p>

            <h1>
              {user.name || "Your Name"}
            </h1>

            {user.profession && (
              <h2>
                {user.profession}
              </h2>
            )}

            <p className="glass-hero-bio">
              {user.bio ||
                "I create modern, useful and beautiful digital experiences."}
            </p>

            <div className="glass-hero-actions">

              {user.resumeUrl && (
                <a
                  href={user.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-primary-btn"
                >
                  View Resume ↗
                </a>
              )}

              <a
                href="#glass-projects"
                className="glass-secondary-btn"
              >
                Explore Projects
              </a>

            </div>

            {/* SOCIAL LINKS */}
            <div className="glass-socials">

              {user.socialLinks?.github && (
                <a
                  href={user.socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              )}

              {user.socialLinks?.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              )}

              {user.socialLinks?.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
              )}

              {user.socialLinks?.website && (
                <a
                  href={user.socialLinks.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Website
                </a>
              )}

            </div>
          </div>

          {/* PROFILE IMAGE */}
          <div className="glass-profile-wrapper">

            <div className="glass-profile-ring">

              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name || "Profile"}
                  className="glass-profile-image"
                />
              ) : (
                <div className="glass-profile-placeholder">
                  {user.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
              )}

            </div>


          </div>

        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="glass-stats">

        <div className="glass-stat-card">
          <span>PROJECTS</span>
          <strong>{projects.length}</strong>
        </div>

        <div className="glass-stat-card">
          <span>SKILLS</span>
          <strong>{skills.length}</strong>
        </div>

        <div className="glass-stat-card">
          <span>EXPERIENCE</span>
          <strong>FRESHER</strong>
        </div>

        <div className="glass-stat-card">
          <span>STATUS</span>
          <strong>OPEN</strong>
        </div>

      </section>

      {/* ================= ABOUT ================= */}
      <section
        className="glass-section"
        id="glass-about"
      >

        <div className="glass-section-heading">
          <span>ABOUT ME</span>
          <h2>Building ideas into digital experiences.</h2>
        </div>

        <div className="glass-about-card">

          <div className="glass-about-number">
            01
          </div>

          <div className="glass-about-content">
            <p>
              {user.bio ||
                "I am a passionate developer focused on creating modern, responsive and reliable digital experiences."}
            </p>

            
          </div>

        </div>

      </section>

      {/* ================= SKILLS ================= */}
      <section
        className="glass-section"
        id="glass-skills"
      >

        <div className="glass-section-heading">
          <span>EXPERTISE</span>
          <h2>Skills & Technologies</h2>
        </div>

        <div className="glass-skills-grid">

          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                className="glass-skill-card"
                key={skill._id}
              >

                <div className="glass-skill-top">
                  <span className="glass-skill-category">
                    {skill.category || "Technology"}
                  </span>

                  <span className="glass-skill-level">
                    {skill.level || "Beginner"}
                  </span>
                </div>

                <h3>
                  {skill.name}
                </h3>

                <div className="glass-skill-line">
                  <span></span>
                </div>

              </div>
            ))
          ) : (
            <p className="glass-empty">
              No skills added yet.
            </p>
          )}

        </div>

      </section>

      {/* ================= PROJECTS ================= */}
      <section
        className="glass-section"
        id="glass-projects"
      >

        <div className="glass-section-heading">
          <span>SELECTED WORK</span>
          <h2>Projects That Bring Ideas to Life</h2>
        </div>

        <div className="glass-projects-grid">

          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article
                className="glass-project-card"
                key={project._id}
              >

                <div className="glass-project-image">

                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={project.title}
                    />
                  ) : (
                    <div className="glass-project-placeholder">
                      <span>
                        PROJECT
                      </span>

                      <strong>
                        {String(index + 1).padStart(2, "0")}
                      </strong>
                    </div>
                  )}

                  <div className="glass-project-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                </div>

                <div className="glass-project-content">

                  <div className="glass-project-meta">

                    {project.category && (
                      <span className="glass-project-category">
                        {project.category}
                      </span>
                    )}

                    <span>
                      PROJECT {String(index + 1).padStart(2, "0")}
                    </span>

                  </div>

                  <h3>
                    {project.title}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  {/* TECH STACK */}
                  {project.techStack?.length > 0 && (
                    <div className="glass-tech-stack">

                      {project.techStack.map(
                        (tech, techIndex) => (
                          <span key={techIndex}>
                            {tech}
                          </span>
                        )
                      )}

                    </div>
                  )}

                  {/* LINKS */}
                  <div className="glass-project-links">

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                        <span>↗</span>
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo
                        <span>↗</span>
                      </a>
                    )}

                  </div>

                </div>

              </article>
            ))
          ) : (
            <p className="glass-empty">
              No projects added yet.
            </p>
          )}

        </div>

      </section>

      {/* ================= CONTACT ================= */}
      <section
        className="glass-contact"
        id="glass-contact"
      >

        <div className="glass-contact-bg">
          <div className="glass-contact-orb"></div>
        </div>

        <div className="glass-contact-inner">

          <div className="glass-contact-text">

            <span>
               GET IN TOUCH
            </span>

            <h2>
              Let's create
              <br />
              something
              <br />
              <strong>great .</strong>
            </h2>

            <p>
              Have a project, opportunity or idea?
              Feel free to send me a message.
            </p>

            <div className="glass-contact-info">
              <div>
                <span>USERNAME</span>
                <strong>
                  @{user.username || "username"}
                </strong>
              </div>

              <div>
                <span>AVAILABILITY</span>
                <strong>
                  Open to Work
                </strong>
              </div>
            </div>

          </div>

          <div className="glass-contact-form">
            <ContactForm
              username={user.username}
            />
          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}
      <footer className="glass-footer">

        <div>
          © {new Date().getFullYear()}{" "}
          {user.name || "Your Name"}
        </div>

        <div className="glass-footer-brand">
          Code<span>Folio</span>
        </div>

        <div>
          @{user.username || "username"}
        </div>

      </footer>

    </div>
  );
};

export default Glassmorphism;