import React from "react";
import "./Cyberpunk.css";
import ContactForm from "../../components/ContactForm";

const Cyberpunk = ({ data }) => {
  return (
    <div className="cyberpunk">

    

      {/* =========================
          HERO
      ========================== */}
      <section className="cyber-hero">

        {data?.profileImage && (
          <img
            src={data.profileImage}
            alt={data.name}
            className="cyber-profile-image"
          />
        )}

        <div className="cyber-terminal">
          <span></span> HELLO, I'M
        </div>

        <h1>
          {data?.name || "YOUR NAME"}
        </h1>

        {data?.profession && (
          <p className="cyber-profession">
            {data.profession}
          </p>
        )}

        <p>
          {data?.bio ||
            "Full Stack Developer building modern digital experiences."}
        </p>


        {/* SOCIAL LINKS */}
        <div className="cyber-socials">

          {data?.socialLinks?.github && (
            <a
              href={data.socialLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
          )}

          {data?.socialLinks?.linkedin && (
            <a
              href={data.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LINKEDIN
            </a>
          )}

          {data?.socialLinks?.twitter && (
            <a
              href={data.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
            >
              TWITTER
            </a>
          )}

          {data?.socialLinks?.website && (
            <a
              href={data.socialLinks.website}
              target="_blank"
              rel="noreferrer"
            >
              WEBSITE
            </a>
          )}

          {data?.resumeUrl && (
            <a
              href={data.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              RESUME
            </a>
          )}

        </div>

      </section>


      {/* =========================
          SKILLS
      ========================== */}
      <section className="cyber-section">

        <div className="cyber-section-title">
          SKILLS
        </div>

        <div className="cyber-skills">

          {data?.skills?.length > 0 ? (
            data.skills.map((skill) => (
              <div
                className="cyber-skill"
                key={skill._id}
              >
                <span></span>
                {skill.name}
              </div>
            ))
          ) : (
            <p>No skills added yet.</p>
          )}

        </div>

      </section>


      {/* =========================
          PROJECTS
      ========================== */}
      <section className="cyber-section">

        <div className="cyber-section-title">
          PROJECTS
        </div>

        <div className="cyber-projects">

          {data?.projects?.length > 0 ? (
            data.projects.map((project) => (

              <article
                className="cyber-project"
                key={project._id}
              >

                {project.screenshot && (
                  <img
                    src={project.screenshot}
                    alt={project.title}
                  />
                )}

                <div className="cyber-project-content">

                  {/* PROJECT TITLE */}
                  <h2>
                    {project.title}
                  </h2>


                  {/* PROJECT CATEGORY */}
                  {project.category && (
                    <div className="cyber-project-category">
                      CATEGORY: {project.category}
                    </div>
                  )}


                  {/* PROJECT DESCRIPTION */}
                  <p>
                    {project.description}
                  </p>


                  {/* TECH STACK */}
                  <div className="cyber-tech">

                    {project.techStack?.map(
                      (tech, index) => (
                        <span key={index}>
                          {tech}
                        </span>
                      )
                    )}

                  </div>


                  {/* PROJECT LINKS */}
                  <div className="cyber-project-links">

                    {project.repoLink && (
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        [ GITHUB ]
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        [ LIVE ]
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
          CONTACT
      ========================== */}
      <section className="cyber-section cyber-contact-section">

        <div className="cyber-section-title">
          CONTACT
        </div>

        <ContactForm
          username={data?.username}
        />

      </section>


      {/* =========================
          FOOTER
      ========================== */}
      <footer className="cyber-footer">

       
        <p>
          © {new Date().getFullYear()}{" "}
          {data?.name || "YOUR NAME"}
        </p>

      </footer>

    </div>
  );
};

export default Cyberpunk;