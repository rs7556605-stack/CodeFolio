import React from "react";
import "./Nexus.css";
import ContactForm from "../../components/ContactForm";

const Nexus = ({ data }) => {
  return (
    <div className="nexus">

      {/* =========================
          NAVBAR
      ========================== */}
      <header className="nexus-header">

        <div className="nexus-logo">
          <span className="nexus-logo-icon"></span>
          CodeFolio
        </div>

        <div className="nexus-username">
          @{data?.username}
        </div>

      </header>


      {/* =========================
          HERO
      ========================== */}
      <section className="nexus-hero">

        <div className="nexus-hero-content">

          <div className="nexus-status">
           
            AVAILABLE FOR OPPORTUNITIES
          </div>

          <h1>
            Hi, I'm{" "}
            <strong>
              {data?.name || "Your Name"}
            </strong>
          </h1>

          {data?.profession && (
            <h2>
              {data.profession}
            </h2>
          )}

          <p className="nexus-bio">
            {data?.bio ||
              "I build modern digital experiences and innovative solutions."}
          </p>


          {/* HERO BUTTONS */}
          <span className="nexus-hero-buttons">

            {data?.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="nexus-primary-btn"
              >
                View Resume ↗
              </a>
            )}

            <a
              href="#nexus-projects"
              className="nexus-secondary-btn"
            >
              View Projects ↓
            </a>

          </span>


          {/* SOCIAL LINKS */}
          <div className="nexus-socials">

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
        <div className="nexus-profile-wrapper">

          <div className="nexus-profile-glow"></div>

          {data?.profileImage ? (
            <img
              src={data.profileImage}
              alt={data?.name || "Profile"}
              className="nexus-profile-image"
            />
          ) : (
            <div className="nexus-profile-placeholder">
              {data?.name?.charAt(0) || "N"}
            </div>
          )}

        </div>

      </section>


      {/* =========================
          STATS
      ========================== */}
      <section className="nexus-stats">

        <div className="nexus-stat">
          <strong>
            {data?.projects?.length || 0}
          </strong>
          <span>Projects</span>
        </div>

        <div className="nexus-stat">
          <strong>
            {data?.skills?.length || 0}
          </strong>
          <span>Skills</span>
        </div>

        <div className="nexus-stat">
          <strong>
            {data?.profession ? "01" : "00"}
          </strong>
          <span>Profession</span>
        </div>

      </section>


      {/* =========================
          SKILLS
      ========================== */}
      <section className="nexus-section">

        <div className="nexus-section-heading">

          

          <h2>
            Skills & Technologies
          </h2>

        </div>


        <div className="nexus-skills">

          {data?.skills?.length > 0 ? (

            data.skills.map((skill) => (

              <div
                className="nexus-skill-card"
                key={skill._id}
              >

                <div className="nexus-skill-top">

                  <span className="nexus-skill-dot"></span>

                  <span className="nexus-skill-category">
                    {skill.category}
                  </span>

                </div>

                <h3>
                  {skill.name}
                </h3>

                <span className="nexus-skill-level">
                  {skill.level || "Beginner"}
                </span>

              </div>

            ))

          ) : (

            <p className="nexus-empty">
              No skills added yet.
            </p>

          )}

        </div>

      </section>


      {/* =========================
          PROJECTS
      ========================== */}
      <section
        className="nexus-section"
        id="nexus-projects"
      >

        <div className="nexus-section-heading">

          

          <h2>
            Featured Projects
          </h2>

          <p>
            A selection of projects built with modern
            technologies and creative ideas.
          </p>

        </div>


        <div className="nexus-projects">

          {data?.projects?.length > 0 ? (

            data.projects.map((project, index) => (

              <article
                className="nexus-project-card"
                key={project._id}
              >

                {/* PROJECT NUMBER */}
                <div className="nexus-project-number">
                  {String(index + 1).padStart(2, "0")}
                </div>


                {/* SCREENSHOT */}
                {project.screenshot ? (

                  <div className="nexus-project-image-wrapper">

                    <img
                      src={project.screenshot}
                      alt={project.title}
                      className="nexus-project-image"
                    />

                  </div>

                ) : (

                  <div className="nexus-project-no-image">
                    PROJECT 
                  </div>

                )}


                <div className="nexus-project-content">

                  {/* TITLE */}
                  <h3>
                    {project.title}
                  </h3>


                  {/* CATEGORY */}
                  {project.category && (
                    <div className="nexus-project-category">
                      {project.category}
                    </div>
                  )}


                  {/* DESCRIPTION */}
                  <p>
                    {project.description}
                  </p>


                  {/* TECH STACK */}
                  <div className="nexus-tech">

                    {project.techStack?.map(
                      (tech, techIndex) => (
                        <span key={techIndex}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>


                  {/* LINKS */}
                  <div className="nexus-project-links">

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub ↗
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Live Demo ↗
                      </a>
                    )}

                  </div>

                </div>

              </article>

            ))

          ) : (

            <p className="nexus-empty">
              No projects added yet.
            </p>

          )}

        </div>

      </section>


      {/* =========================
          CONTACT
      ========================== */}
      <section className="nexus-contact">

        <div className="nexus-contact-content">


          <h2>
            Let's build something
            <br />
            <span>great together.</span>
          </h2>

          <p>
            Have a project, opportunity, or idea?
            Feel free to send me a message.
          </p>

        </div>


        <div className="nexus-contact-form">

          <ContactForm
            username={data?.username}
          />

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="nexus-footer">

          
      
        <p>
          © {new Date().getFullYear()}{" "}
          {data?.name || "Your Name"}
        </p>

        <span>
          CODEFOLIO
        </span>

      </footer>

    </div>
  );
};

export default Nexus;