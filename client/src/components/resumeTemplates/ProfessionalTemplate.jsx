import React from "react";
import "./ResumeTemplate.css";

const ProfessionalTemplate = ({ resume }) => {
  const personalInfo = resume?.personalInfo || {};

  const education = Array.isArray(resume?.education)
    ? resume.education
    : [];

  const experience = Array.isArray(resume?.experience)
    ? resume.experience
    : [];

  const skills = Array.isArray(resume?.skills)
    ? resume.skills
    : [];

  const strengths = Array.isArray(resume?.strengths)
    ? resume.strengths.filter(Boolean)
    : [];

  const projects = Array.isArray(resume?.projects)
    ? resume.projects
    : [];

  const certifications = Array.isArray(resume?.certifications)
    ? resume.certifications
    : [];

  const languages = Array.isArray(resume?.languages)
    ? resume.languages
    : [];

  const socialLinks = resume?.socialLinks || {};

  /* =========================================================
     SKILLS
  ========================================================= */

  const technicalSkills = skills.filter(
    (skill) => skill?.type === "Technical"
  );

  const softSkills = skills.filter(
    (skill) => skill?.type === "Soft"
  );

  /* =========================================================
     HELPERS
  ========================================================= */

  const getSkillNames = (skill) => {
    if (!skill) return [];

    const names = Array.isArray(skill.name)
      ? skill.name
      : skill.name
      ? [skill.name]
      : [];

    return names
      .map((name) => {
        if (name === "Other") {
          return skill.customName || "Other";
        }

        return name;
      })
      .filter(Boolean);
  };

  const getCategory = (skill) => {
    if (!skill) return "";

    if (skill.category === "Other") {
      return skill.customCategory || "";
    }

    return skill.category || "";
  };

  const getExpertise = (skill) => {
    if (!skill) return "";

    if (skill.expertise === "Other") {
      return skill.customExpertise || "";
    }

    return skill.expertise || "";
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="resume-template professional-template">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="professional-header">

        {personalInfo.profileImage && (
          <div className="professional-profile-image">
            <img
              src={personalInfo.profileImage}
              alt="Profile"
            />
          </div>
        )}

        <div className="professional-header-content">

          <h1>
            {personalInfo.fullName || "Your Name"}
          </h1>

          <h2>
            {personalInfo.profession || "Your Profession"}
          </h2>

          <div className="professional-contact">

            {personalInfo.email && (
              <span>
                ✉ {personalInfo.email}
              </span>
            )}

            {personalInfo.phone && (
              <span>
                ☎ {personalInfo.phone}
              </span>
            )}

            {personalInfo.location && (
              <span>
                📍 {personalInfo.location}
              </span>
            )}

          </div>

        </div>

      </header>


      {/* =====================================================
          BODY
          
          IMPORTANT:
          Left and right columns are independent.
          This removes the blank space before Projects.
      ===================================================== */}

      <div className="professional-body">

        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <aside className="professional-left-column">

          {/* TECHNICAL SKILLS */}

          {technicalSkills.length > 0 && (
            <section className="professional-section professional-technical-section">

              <h3>
                Technical Skills
              </h3>

              <div className="professional-technical-skills">

                {technicalSkills.map((skill, index) => {

                  const names =
                    getSkillNames(skill);

                  const category =
                    getCategory(skill);

                  const expertise =
                    getExpertise(skill);

                  return (
                    <div
                      className="professional-technical-group"
                      key={index}
                    >

                      {category && (
                        <div className="professional-skill-category">
                          {category}
                        </div>
                      )}

                      {expertise && (
                        <div className="professional-skill-expertise">
                          {expertise}
                        </div>
                      )}

                      {names.length > 0 && (
                        <ul className="professional-skill-list">

                          {names.map(
                            (name, skillIndex) => (
                              <li
                                key={skillIndex}
                                className="professional-skill-item"
                              >
                                {name}
                              </li>
                            )
                          )}

                        </ul>
                      )}

                      {skill.level && (
                        <div className="professional-skill-level">
                          Level: {skill.level}
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>

            </section>
          )}


          {/* SOFT SKILLS */}

          {softSkills.length > 0 && (
            <section className="professional-section professional-soft-section">

              <h3>
                Soft Skills
              </h3>

              <div className="professional-soft-skills">

                {softSkills.map(
                  (skill, index) =>
                    getSkillNames(skill).map(
                      (name, nameIndex) => (

                        <div
                          className="professional-soft-item"
                          key={`${index}-${nameIndex}`}
                        >

                          <span className="professional-soft-bullet">
                            •
                          </span>

                          <span className="professional-soft-name">
                            {name}
                          </span>

                        </div>

                      )
                    )
                )}

              </div>

            </section>
          )}


          {/* STRENGTHS */}

          {strengths.length > 0 && (
            <section className="professional-section professional-strengths-section">

              <h3>
                Strengths
              </h3>

              <ul className="professional-strengths">

                {strengths
                  .flatMap((strength) =>
                    String(strength)
                      .split(",")
                      .map((item) => item.trim())
                  )
                  
                  .filter(Boolean)
                  .map((strength, index) => (
                    
                    <li key={index}>
                      {strength}
                    </li>
                    
                  ))}

              </ul>

            </section>
          )}


          {/* LANGUAGES */}

          {languages.length > 0 && (
            <section className="professional-section professional-languages-section">

              <h3>
                Languages
              </h3>

              <div className="professional-languages">

                {languages.map((item, index) => (

                  <div
                    className="professional-language"
                    key={index}
                  >

                    <span>
                      {item.name}
                    </span>

                    {item.proficiency && (
                      <small>
                        {item.proficiency}
                      </small>
                    )}

                    {item.level && (
                      <small>
                        {item.level}
                      </small>
                    )}

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* LINKS */}

          {(socialLinks.github ||
            socialLinks.linkedin ||
            socialLinks.twitter ||
            socialLinks.website) && (

            <section className="professional-section professional-links-section">

              <h3>
                Links
              </h3>

              <div className="professional-social-links">

                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>
                      GitHub
                    </strong>

                    <span>
                      {socialLinks.github}
                    </span>
                  </a>
                )}

                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>
                      LinkedIn
                    </strong>

                    <span>
                      {socialLinks.linkedin}
                    </span>
                  </a>
                )}

                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>
                      Twitter / X
                    </strong>

                    <span>
                      {socialLinks.twitter}
                    </span>
                  </a>
                )}

                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>
                      Personal Website
                    </strong>

                    <span>
                      {socialLinks.website}
                    </span>
                  </a>
                )}

              </div>

            </section>
          )}

        </aside>


        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <main className="professional-right-column">

          {/* ABOUT ME */}

          {resume?.summary && (
            <section className="professional-section professional-summary-section">

              <h3>
                About Me
              </h3>

              <p className="professional-summary">
                {resume.summary}
              </p>

            </section>
          )}


          {/* EDUCATION */}

          {education.length > 0 && (
            <section className="professional-section professional-education-section">

              <h3>
                Education
              </h3>

              <div className="professional-items">

                {education.map((item, index) => (

                  <div
                    className="professional-item professional-education-item"
                    key={index}
                  >

                    <div className="professional-item-header">

                      <h4>
                        {item.degree ||
                          "Degree / Qualification"}
                      </h4>

                      {item.year && (
                        <span className="professional-year">
                          {item.year}
                        </span>
                      )}

                    </div>

                    {item.institution && (
                      <p className="professional-company">
                        {item.institution}
                      </p>
                    )}

                    {item.description && (
                      <p className="professional-description">
                        {item.description}
                      </p>
                    )}

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* EXPERIENCE */}

          {experience.length > 0 && (
            <section className="professional-section professional-experience-section">

              <h3>
                Experience
              </h3>

              <div className="professional-items professional-experience-items">

                {experience.map((item, index) => (

                  <div
                    className="professional-item professional-experience-item"
                    key={index}
                  >

                    <div className="professional-item-header">

                      <h4>
                        {item.jobTitle ||
                          "Job Title"}
                      </h4>

                      {(item.startDate ||
                        item.endDate) && (

                        <span className="professional-year">

                          {item.startDate}

                          {item.startDate &&
                          item.endDate
                            ? " - "
                            : ""}

                          {item.endDate}

                        </span>

                      )}

                    </div>

                    {item.company && (
                      <p className="professional-company">
                        {item.company}
                      </p>
                    )}

                    {item.description && (
                      <p className="professional-description">
                        {item.description}
                      </p>
                    )}

                    {Array.isArray(
                      item.responsibilities
                    ) &&
                      item.responsibilities
                        .filter(Boolean)
                        .length > 0 && (

                        <ul className="professional-responsibilities">
<span className="a">Responsibilities</span>
                          {item.responsibilities
                            .filter(Boolean)
                            .map(
                              (
                                responsibility,
                                responsibilityIndex
                              ) => (

                                <li
                                  key={
                                    responsibilityIndex
                                  }
                                >
                                  {responsibility}
                                </li>

                              )
                            )}

                        </ul>

                      )}

                  </div>

                ))}

              </div>

            </section>
          )}


          {/* PROJECTS */}

          {projects.length > 0 && (
            <section className="professional-section professional-projects-section">

              <h3>
                Projects
              </h3>

              <div className="professional-projects">

                {projects.map((project, index) => (

                  <article
                    className="professional-project"
                    key={index}
                  >

                    <h4>
                      {project.title ||
                        "Project"}
                    </h4>

                    {project.description && (
                      <p className="professional-description">
                        {project.description}
                      </p>
                    )}

                    {Array.isArray(
                      project.techStack
                    ) &&
                      project.techStack.length > 0 && (

                        <div className="professional-project-tech">

                          {project.techStack.map(
                            (tech, techIndex) => (

                              <span
                                key={techIndex}
                              >
                                {tech}
                              </span>

                            )
                          )}

                        </div>

                      )}

                    {(project.repoLink ||
                      project.liveLink) && (

                      <div className="professional-project-links">

                        {project.repoLink && (
                          <a
                            href={project.repoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            GitHub
                          </a>
                        )}

                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Live Demo
                          </a>
                        )}

                      </div>

                    )}

                  </article>

                ))}

              </div>

            </section>
          )}


          {/* CERTIFICATIONS */}

          {certifications.length > 0 && (
            <section className="professional-section professional-certifications-section">

              <h3>
                Certifications & Training
              </h3>

              <div className="professional-items">

                {certifications.map(
                  (item, index) => (

                    <div
                      className="professional-item professional-certification-item"
                      key={index}
                    >

                      <div className="professional-item-header">

                        <h4>
                          {item.name ||
                            "Certification"}
                        </h4>

                        {item.year && (
                          <span className="professional-year">
                            {item.year}
                          </span>
                        )}

                      </div>

                      {(item.organization ||
                        item.issuer) && (

                        <p className="professional-company">
                          {item.organization ||
                            item.issuer}
                        </p>

                      )}

                      {item.credentialUrl && (
                        <a
                          className="professional-credential"
                          href={
                            item.credentialUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Credential
                        </a>
                      )}

                    </div>

                  )
                )}

              </div>

            </section>
          )}

        </main>

      </div>

    </div>
  );
};

export default ProfessionalTemplate;