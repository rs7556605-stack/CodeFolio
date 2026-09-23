import React from "react";
import "./ResumeTemplate.css";

const ModernTemplate = ({ resume }) => {
  const personalInfo = resume?.personalInfo || {};

  const skills = Array.isArray(resume?.skills)
    ? resume.skills
    : [];

  const technicalSkills = skills.filter(
    (skill) => skill?.type === "Technical"
  );

  const softSkills = skills.filter(
    (skill) => skill?.type === "Soft"
  );

  const strengths = Array.isArray(resume?.strengths)
    ? resume.strengths.filter(Boolean)
    : [];

  // ==========================================
  // GET SKILL NAMES
  // ==========================================

  const getSkillNames = (skill) => {
    if (!skill) return [];

    const names = Array.isArray(skill.name)
      ? skill.name
      : skill.name
      ? [skill.name]
      : [];

    return names
      .map((name) =>
        name === "Other"
          ? skill.customName || "Other"
          : name
      )
      .filter(Boolean);
  };

  // ==========================================
  // GET CATEGORY
  // ==========================================

  const getCategory = (skill) => {
    if (!skill) return "";

    return skill.category === "Other"
      ? skill.customCategory || ""
      : skill.category || "";
  };

  // ==========================================
  // GET EXPERTISE
  // ==========================================

  const getExpertise = (skill) => {
    if (!skill) return "";

    return skill.expertise === "Other"
      ? skill.customExpertise || ""
      : skill.expertise || "";
  };

  return (
    <div className="resume-template modern-template">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="modern-header">

        {/* PROFILE IMAGE */}
        <div className="modern-profile">
          {personalInfo.profileImage && (
            <img
              src={personalInfo.profileImage}
              alt="Profile"
            />
          )}
        </div>

        {/* HEADER INFORMATION */}
        <div className="modern-header-info">

          <h1>
            {personalInfo.fullName || "Your Name"}
          </h1>

          <h2>
            {personalInfo.profession || "Your Profession"}
          </h2>

          <div className="modern-contact">

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
          MAIN LAYOUT
      ===================================================== */}

      <div className="modern-layout">

        {/* ===================================================
            LEFT SIDEBAR
        =================================================== */}

        <aside className="modern-sidebar">


          {/* =================================================
              TECHNICAL SKILLS
          ================================================= */}

          {technicalSkills.length > 0 && (
            <section>

              <h3>Technical Skills</h3>

              {technicalSkills.map(
                (skill, index) => {

                  const names =
                    getSkillNames(skill);

                  const category =
                    getCategory(skill);

                  // IMPORTANT:
                  // Expertise variable
                  const expertise =
                    getExpertise(skill);

                  return (
                    <div
                      className="modern-skill-group"
                      key={index}
                    >

                      {/* CATEGORY */}
                      {category && (
                        <strong>
                          {category}
                        </strong>
                      )}


                      {/* EXPERTISE */}
                      {expertise && (
                        <span className="modern-skill-expertise">
                          {expertise}
                        </span>
                      )}


                      {/* SKILLS */}
                      {names.length > 0 && (
                        <ul className="modern-skill-list">

                          {names.map(
                            (name, skillIndex) => (
                              <li
                                key={skillIndex}
                                className="modern-skill-item"
                              >
                                {name}
                              </li>
                            )
                          )}

                        </ul>
                      )}
                      {skill.level && (
  <div className="modern-skill-level">
    Level: {skill.level}
  </div>
)}

                    </div>
                  );
                }
              )}

            </section>
          )}


          {/* =================================================
              SOFT SKILLS
          ================================================= */}

          {softSkills.length > 0 && (
            <section>

              <h3>Soft Skills</h3>

              <div className="modern-soft-skills">

                {softSkills.map(
                  (skill, index) =>
                    getSkillNames(skill).map(
                      (name, skillIndex) => (
                        <span
                          key={`${index}-${skillIndex}`}
                        >
                          {name}
                        </span>
                      )
                    )
                )}

              </div>

            </section>
          )}


          {/* =================================================
              STRENGTHS
          ================================================= */}

          {strengths.length > 0 && (
            <section>

              <h3>Strengths</h3>

              <ul className="modern-strength-list">

  {strengths
    .flatMap((item) =>
      String(item)
        .split(",")
        .map((x) => x.trim())
    )
    .filter(Boolean)
    .map(
      (strength, index) => (
        <li key={index}>
          {strength}
        </li>
      )
    )}

</ul>

            </section>
          )}


          {/* =================================================
              LANGUAGES
          ================================================= */}

          {resume?.languages?.length > 0 && (
            <section>

              <h3>Languages</h3>

              {resume.languages.map(
                (language, index) => (
                  <div
                    className="modern-language"
                    key={index}
                  >

                    <span>
                      {language.name}
                    </span>


                  </div>
                )
              )}

            </section>
          )}

{/* =================================================
    SOCIAL LINKS
================================================= */}

{resume?.socialLinks &&
  Object.values(resume.socialLinks).some(
    (link) => link
  ) && (
    <section className="modern-social-links-section">

      <h3>Social Links</h3>

      <div className="modern-social-links">

        {resume.socialLinks.github && (
          <a
            href={resume.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>GitHub</span>
          </a>
        )}

        {resume.socialLinks.linkedin && (
          <a
            href={resume.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>LinkedIn</span>
          </a>
        )}

        {resume.socialLinks.twitter && (
          <a
            href={resume.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Twitter / X</span>
          </a>
        )}

        {resume.socialLinks.website && (
          <a
            href={resume.socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Website</span>
          </a>
        )}

      </div>

    </section>
)}



        </aside>




        {/* ===================================================
            MAIN CONTENT
        =================================================== */}

        <main className="modern-main">


          {/* =================================================
              PROFESSIONAL SUMMARY
          ================================================= */}

          {resume?.summary && (
            <section>

              <h3>Professional Summary</h3>

              <p>
                {resume.summary}
              </p>

            </section>
          )}


          {/* =================================================
              EXPERIENCE
          ================================================= */}

          {resume?.experience?.length > 0 && (
            <section>

              <h3>Experience</h3>

              {resume.experience.map(
                (item, index) => (

                  <article
                    className="modern-item"
                    key={index}
                  >

                    <div className="modern-item-heading">

                      <div>

                        <h4>
                          {item.jobTitle ||
                            "Job Title"}
                        </h4>

                        {item.company && (
                          <strong>
                            {item.company}
                          </strong>
                        )}

                      </div>


                      {(item.startDate ||
                        item.endDate) && (
                        <span>

                          {item.startDate}

                          {item.startDate &&
                          item.endDate
                            ? " - "
                            : ""}

                          {item.endDate}

                        </span>
                      )}

                    </div>


                    {/* EXPERIENCE DESCRIPTION */}

                    {item.description && (
                      <p >
                        {item.description}
                      </p>
                    )}


                    {/* RESPONSIBILITIES */}

                    {Array.isArray(
                      item.responsibilities
                    ) &&
                      item.responsibilities
                        .filter(Boolean)
                        .length > 0 && (

                       <div className="modern-responsibilities">

  <span className="modern-responsibilities-title">
    Responsibilities
  </span>

  {item.responsibilities
    .filter(Boolean)
    .map(
      (
        responsibility,
        responsibilityIndex
      ) => (
        <p
          key={responsibilityIndex}
          className="modern-responsibility-item"
        >
          {responsibility}
        </p>
      )
    )}

</div>
                      )}

                  </article>

                )
              )}

            </section>
          )}


          {/* =================================================
              EDUCATION
          ================================================= */}
{resume?.education?.length > 0 && (
  <section>

    <h3>Education</h3>

    {resume.education.map((item, index) => (
      <article
        className="modern-item"
        key={index}
      >

        {/* EDUCATION ROW */}
        <div className="modern-education-row">

          {/* DEGREE */}
          <strong className="modern-education-degree">
            {item.degree || "Degree / Qualification"}
          </strong>

          {/* INSTITUTION */}
          <strong className="modern-education-institution">
            {item.institution || ""}
          </strong>

          {/* YEAR */}
          <span className="modern-education-year">
            {item.year || ""}
          </span>

        </div>

        {/* DESCRIPTION */}
        {item.description && (
          <p className="modern-education-description">
            {item.description}
          </p>
        )}

      </article>
    ))}

  </section>
)}

          {/* =================================================
              PROJECTS
          ================================================= */}

          {resume?.projects?.length > 0 && (
            <section>

              <h3>Projects</h3>

              {resume.projects.map(
                (project, index) => (

                  <article
                    className="modern-item"
                    key={index}
                  >

                    <h4>
                      {project.title || "Project"}
                    </h4>


                    {project.description && (
                      <p>
                        {project.description}
                      </p>
                    )}


                    {/* PROJECT TECHNOLOGIES */}

                    {project.techStack?.length >
                      0 && (
                      <div className="modern-project-tech">

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


                    {/* PROJECT LINKS */}

                    <div className="modern-links">

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

                  </article>

                )
              )}

            </section>
          )}


          {/* =================================================
              CERTIFICATIONS
          ================================================= */}

         {resume?.certifications?.length > 0 && (
  <section>

    <h3>Certifications & Training</h3>

    {resume.certifications.map((item, index) => (
      <article
        className="modern-item"
        key={index}
      >

        {/* CERTIFICATION ROW */}
        <div className="modern-certification-row">

          {/* CERTIFICATION NAME */}
          <strong className="modern-certification-name">
            {item.name || "Certification"}
          </strong>

          {/* ORGANIZATION */}
          <strong className="modern-certification-organization">
            {item.organization || item.issuer || ""}
          </strong>

          {/* YEAR */}
          <span className="modern-certification-year">
            {item.year || ""}
          </span>

        </div>

        {/* CREDENTIAL LINK */}
        {item.credentialUrl && (
         <div className="modern-certification-link">
  <a
    href={item.credentialUrl}
    target="_blank"
    rel="noopener noreferrer"
  >
    🔗 View Credential
  </a>
</div>
        )}

      </article>
    ))}

  </section>
)}

        </main>

      </div>

    </div>
  );
};

export default ModernTemplate;