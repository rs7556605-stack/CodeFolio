import React from "react";
import "./ResumeTemplate.css";

/* =========================================================
   HELPERS
========================================================= */

const getArray = (value) => {
  return Array.isArray(value) ? value : [];
};

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
        return skill.customName || "";
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
   MINIMAL TEMPLATE
========================================================= */

const MinimalTemplate = ({ resume }) => {
  const personalInfo = resume?.personalInfo || {};

  const education = getArray(resume?.education);
  const experience = getArray(resume?.experience);
  const skills = getArray(resume?.skills);
  const projects = getArray(resume?.projects);
  const certifications = getArray(resume?.certifications);
  const languages = getArray(resume?.languages);

  const strengths = getArray(resume?.strengths)
    .flatMap((item) =>
      String(item)
        .split(",")
        .map((value) => value.trim())
    )
    .filter(Boolean);

  const technicalSkills = skills.filter(
    (skill) => skill?.type === "Technical"
  );

  const softSkills = skills.filter(
    (skill) => skill?.type === "Soft"
  );

  return (
    <div
      className="minimal-template"
      data-resume-name={personalInfo.fullName || "My Resume"}
    >

      {/* =====================================================
          PRINT HEADER / FOOTER
          Visible only when using browser Print.
      ===================================================== */}

    
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="minimal-header">

        <div className="minimal-header-main">

          {personalInfo.profileImage && (
            <div className="minimal-profile-image">
              <img
                src={personalInfo.profileImage}
                alt="Profile"
              />
            </div>
          )}

          <div className="minimal-header-content">

            <h1>
              {personalInfo.fullName || "Your Name"}
            </h1>

            {personalInfo.profession && (
              <h2>
                {personalInfo.profession}
              </h2>
            )}

            {(personalInfo.email ||
              personalInfo.phone ||
              personalInfo.location) && (
              <div className="minimal-contact">

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
            )}

          </div>
        </div>

      </header>


      {/* =====================================================
          PROFESSIONAL SUMMARY
      ===================================================== */}

      {resume?.summary && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Professional Summary
            </h3>
          </div>

          <p className="minimal-summary">
            {resume.summary}
          </p>

        </section>
      )}


      {/* =====================================================
          EXPERIENCE
      ===================================================== */}

      {experience.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Experience
            </h3>
          </div>

          <div className="minimal-items">

            {experience.map((item, index) => {

              const responsibilities = Array.isArray(
                item.responsibilities
              )
                ? item.responsibilities.filter(Boolean)
                : [];

              return (
                <article
                  className="minimal-item"
                  key={index}
                >

                  <div className="minimal-item-header">

                    <div>

                      <h4>
                        {item.jobTitle ||
                          "Job Title"}
                      </h4>

                      {item.company && (
                        <div className="minimal-item-company">
                          {item.company}
                        </div>
                      )}

                    </div>

                    {(item.startDate ||
                      item.endDate) && (
                      <div className="minimal-item-date">
                        {item.startDate}

                        {item.startDate &&
                        item.endDate
                          ? " — "
                          : ""}

                        {item.endDate}
                      </div>
                    )}

                  </div>


                  {item.description && (
                    <p className="minimal-item-description">
                      {item.description}
                    </p>
                  )}


                  {responsibilities.length > 0 && (
                    <div className="minimal-list">
<span>responsibilities</span>
                      {responsibilities.map(
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

                    </div>
                  )}

                </article>
              );
            })}

          </div>

        </section>
      )}


      {/* =====================================================
          EDUCATION
      ===================================================== */}

      {education.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Education
            </h3>
          </div>

          <div className="minimal-items">

            {education.map((item, index) => (

              <article
                className="minimal-item"
                key={index}
              >

                <div className="minimal-item-header">

                  <div>

                    <h4>
                      {item.degree ||
                        "Degree / Qualification"}
                    </h4>

                    {item.institution && (
                      <div className="minimal-item-company">
                        {item.institution}
                      </div>
                    )}

                  </div>

                  {item.year && (
                    <div className="minimal-item-date">
                      {item.year}
                    </div>
                  )}

                </div>

                {item.description && (
                  <p className="minimal-item-description">
                    {item.description}
                  </p>
                )}

              </article>

            ))}

          </div>

        </section>
      )}


      {/* =====================================================
          TECHNICAL SKILLS
      ===================================================== */}

      {technicalSkills.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Technical Skills
            </h3>
          </div>


          <div className="minimal-technical-skills">

            {technicalSkills.map((skill, index) => {

              const names = getSkillNames(skill);
              const category = getCategory(skill);
              const expertise = getExpertise(skill);

              return (
                <div
                  className="minimal-technical-group"
                  key={index}
                >

                  <div className="minimal-skill-meta">

                    {category && (
                      <span className="minimal-skill-category">
                        {category}
                      </span>
                    )}

                    {expertise && (
                      <>
                        {category && (
                          <span className="minimal-meta-separator">
                            /
                          </span>
                        )}

                        <span className="minimal-skill-expertise">
                          {expertise}
                        </span>
                      </>
                    )}

                    {skill.level && (
                      <span className="minimal-skill-level">
                        {skill.level}
                      </span>
                    )}

                  </div>


                  {names.length > 0 && (
                    <div className="minimal-skill-list">

                      {names.map((name, nameIndex) => (

                        <span
                          className="minimal-skill"
                          key={nameIndex}
                        >
                          {name}
                        </span>

                      ))}

                    </div>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}


      {/* =====================================================
          SOFT SKILLS
      ===================================================== */}

      {softSkills.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Soft Skills
            </h3>
          </div>

          <div className="minimal-soft-skills">

            {softSkills.map((skill, index) => {

              const names = getSkillNames(skill);

              return names.map(
                (name, nameIndex) => (

                  <span
                    className="minimal-soft-skill"
                    key={`${index}-${nameIndex}`}
                  >
                    {name}
                  </span>

                )
              );
            })}

          </div>

        </section>
      )}


      {/* =====================================================
          STRENGTHS
      ===================================================== */}

      {strengths.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Strengths
            </h3>
          </div>

          <div className="minimal-strengths">

            {strengths.map(
              (strength, index) => (

                <div
                  className="minimal-strength"
                  key={index}
                >

                  <span className="minimal-strength-mark">
                    ✓
                  </span>

                  <span>
                    {strength}
                  </span>

                </div>

              )
            )}

          </div>

        </section>
      )}


      {/* =====================================================
          PROJECTS
      ===================================================== */}

      {projects.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Projects
            </h3>
          </div>

          <div className="minimal-items">

            {projects.map((project, index) => (

              <article
                className="minimal-project"
                key={index}
              >

                <div className="minimal-project-header">

                  <h4>
                    {project.title ||
                      "Project"}
                  </h4>

                  {(project.repoLink ||
                    project.liveLink) && (
                    <div className="minimal-project-links">

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
                  )}

                </div>


                {project.description && (
                  <p className="minimal-item-description">
                    {project.description}
                  </p>
                )}


                {Array.isArray(
                  project.techStack
                ) &&
                  project.techStack.length > 0 && (
                    <div className="minimal-project-tech">

                      {project.techStack
                        .filter(Boolean)
                        .map(
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

              </article>

            ))}

          </div>

        </section>
      )}


      {/* =====================================================
          CERTIFICATIONS
      ===================================================== */}

      {certifications.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Certifications
            </h3>
          </div>

          <div className="minimal-items">

            {certifications.map(
              (item, index) => (

                <article
                  className="minimal-certification"
                  key={index}
                >

                  <div>

                    <h4>
                      {item.name ||
                        "Certification"}
                    </h4>

                    {(item.issuer ||
                      item.organization) && (
                      <div className="minimal-item-company">
                        {item.issuer ||
                          item.organization}
                      </div>
                    )}

                  </div>

                  {item.year && (
                    <span className="minimal-item-date">
                      {item.year}
                    </span>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={
                        item.credentialUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="minimal-credential-link"
                    >
                      View Credential
                    </a>
                  )}

                </article>

              )
            )}

          </div>

        </section>
      )}


      {/* =====================================================
          LANGUAGES
      ===================================================== */}

      {languages.length > 0 && (
        <section className="minimal-section">

          <div className="minimal-section-heading">
            <span className="minimal-section-line"></span>

            <h3>
              Languages
            </h3>
          </div>

          <div className="minimal-languages">

            {languages.map(
              (language, index) => (

                <div
                  className="minimal-language"
                  key={index}
                >

                  <span className="minimal-language-name">
                    {language.name}
                  </span>

                  {(language.proficiency ||
                    language.level) && (
                    <span className="minimal-language-level">
                      {language.proficiency ||
                        language.level}
                    </span>
                  )}

                </div>

              )
            )}

          </div>

        </section>
      )}


     
    {/* =====================================================
    SOCIAL LINKS
===================================================== */}

{(resume?.socialLinks?.github ||
  resume?.socialLinks?.linkedin ||
  resume?.socialLinks?.twitter ||
  resume?.socialLinks?.website) && (

  <section className="minimal-section minimal-social-section">

    <div className="minimal-section-heading">
      <span className="minimal-section-line"></span>

      <h3>
        Professional Links
      </h3>
    </div>

    <div className="minimal-social-links">

      {resume?.socialLinks?.github && (
        <a
          href={resume.socialLinks.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      )}

      {resume?.socialLinks?.linkedin && (
        <a
          href={resume.socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      )}

      {resume?.socialLinks?.twitter && (
        <a
          href={resume.socialLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
      )}

      {resume?.socialLinks?.website && (
        <a
          href={resume.socialLinks.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          Website
        </a>
      )}

    </div>

  </section>
)}

    </div>
  );
};

export default MinimalTemplate;