import React from "react";
import "./Minimalist.css";
import ContactForm from "../../components/ContactForm";

const Minimalist = ({ data }) => {
  return (
    <div className="minimalist">

      {/* =========================
          Header
      ========================== */}
      <header className="minimalist-header">
        <div className="minimalist-logo">
          CodeFolio
        </div>

        <div className="minimalist-username">
          @{data?.username}
        </div>
      </header>


      {/* =========================
          Hero
      ========================== */}
      <section className="minimalist-hero">

        <div className="minimalist-profile">

          {data?.profileImage && (
            <img
              src={data.profileImage}
              alt={data.name}
              className="minimalist-profile-image"
            />
          )}

          <h1>
            Hi, I'm {data?.name || "Your Name"}
          </h1>

          {data?.profession && (
            <p className="template-profession">
              {data.profession}
            </p>
          )}

          <p>
            {data?.bio ||
              "Welcome to my professional portfolio."}
          </p>

          <div className="minimalist-socials">

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

            {data?.resumeUrl && (
              <a
                href={data.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                Resume
              </a>
            )}

          </div>

        </div>

      </section>


      {/* =========================
          Skills
      ========================== */}
      <section className="minimalist-section">

        <h2>Skills</h2>

        <div className="minimalist-skills">

          {data?.skills?.length > 0 ? (
            data.skills.map((skill) => (
              <span key={skill._id}>
                {skill.name}
              </span>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}

        </div>

      </section>


      {/* =========================
          Projects
      ========================== */}
      <section className="minimalist-section">

        <h2>Projects</h2>

        <div className="minimalist-projects">

          {data?.projects?.length > 0 ? (
            data.projects.map((project) => (

              <article
                className="minimalist-project"
                key={project._id}
              >

                {/* PROJECT SCREENSHOT */}
                {project.screenshot && (
                  <img
                    src={project.screenshot}
                    alt={project.title}
                  />
                )}

                <div className="minimalist-project-content">

                  {/* PROJECT TITLE */}
                  <h3>
                    {project.title}
                  </h3>


                  {/* PROJECT CATEGORY */}
                  {project.category && (
                    <div className="minimalist-project-category">
                      Category: {project.category}
                    </div>
                  )}


                  {/* PROJECT DESCRIPTION */}
                  <p>
                    {project.description}
                  </p>


                  {/* TECH STACK */}
                  <div className="minimalist-tech">

                    {project.techStack?.map(
                      (tech, index) => (
                        <span key={index}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>


                  {/* PROJECT LINKS */}
                  <div className="minimalist-project-links">

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        GitHub
                      </a>
                    )}

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

                </div>

              </article>

            ))
          ) : (
            <p>No projects added yet.</p>
          )}

        </div>

      </section>


      {/* =========================
          Contact
      ========================== */}
      <ContactForm
        username={data?.username}
      />


      {/* =========================
          Footer
      ========================== */}
      <footer className="minimalist-footer">

        <p>
          © {new Date().getFullYear()}{" "}
          {data?.name || "Your Name"}
        </p>

      </footer>

    </div>
  );
};

export default Minimalist;