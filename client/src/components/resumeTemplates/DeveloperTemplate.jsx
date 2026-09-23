import React from "react";
import "./ResumeTemplate.css";

const DeveloperTemplate = ({ resume }) => {
  if (!resume) {
    return null;
  }

  // =========================================================
  // SAFE DATA
  // =========================================================

  const personalInfo = resume.personalInfo || {};
  const education = Array.isArray(resume.education)
    ? resume.education
    : [];

  const experience = Array.isArray(resume.experience)
    ? resume.experience
    : [];

  const skills = Array.isArray(resume.skills)
    ? resume.skills
    : [];

  const strengths = Array.isArray(resume.strengths)
    ? resume.strengths
    : [];

  const projects = Array.isArray(resume.projects)
    ? resume.projects
    : [];

  const certifications = Array.isArray(resume.certifications)
    ? resume.certifications
    : [];

  const languages = Array.isArray(resume.languages)
    ? resume.languages
    : [];

  const socialLinks = resume.socialLinks || {};

  // =========================================================
  // HELPERS
  // =========================================================

 const getFullName = () => {
  return (
    personalInfo.fullName ||
    personalInfo.name ||
    resume.fullName ||
    resume.name ||
    "Your Name"
  );
};
  const getProfession = () => {
    return (
      personalInfo.profession ||
      resume.profession ||
      "FULL-STACK DEVELOPER"
    );
  };

  const getSummary = () => {
  return (
    resume.summary ||
    personalInfo.summary ||
    personalInfo.bio ||
    resume.bio ||
    ""
  );
};

  const getProfileImage = () => {
    return (
      personalInfo.profileImage ||
      resume.profileImage ||
      ""
    );
  };

  const getEmail = () => {
    return (
      personalInfo.email ||
      resume.email ||
      ""
    );
  };

  const getPhone = () => {
    return (
      personalInfo.phone ||
      resume.phone ||
      ""
    );
  };

  const getLocation = () => {
    return (
      personalInfo.location ||
      resume.location ||
      ""
    );
  };

  const getSkillName = (skill) => {
    if (!skill) return "";

    if (Array.isArray(skill.name)) {
      return skill.name.join(", ");
    }

    return (
      skill.name ||
      skill.customName ||
      ""
    );
  };

  const getSkillLevel = (skill) => {
    if (!skill || !skill.level) {
      return "Beginner";
    }

    return skill.level;
  };

  const getLevelNumber = (level) => {
    switch (String(level).toLowerCase()) {
      case "beginner":
        return 2;

      case "intermediate":
        return 3;

      case "advanced":
        return 5;

      default:
        return 3;
    }
  };

  const renderSkillDots = (level) => {
    const activeDots = getLevelNumber(level);

    return (
      <div
        className="developer-skill-dots"
        aria-label={`${level} skill level`}
      >
        {[1, 2, 3, 4, 5].map((dot) => (
          <span
            key={dot}
            className={
              dot <= activeDots
                ? "developer-dot active"
                : "developer-dot"
            }
          />
        ))}
      </div>
    );
  };

 const getExperienceTitle = (item) => {
  return (
    item.jobTitle ||
    item.title ||
    item.position ||
    item.role ||
    item.designation ||
    "Experience"
  );
};

  const getExperienceCompany = (item) => {
    return (
      item.company ||
      item.organization ||
      item.institution ||
      ""
    );
  };

  const getExperienceDate = (item) => {
    if (item.date) return item.date;
    if (item.duration) return item.duration;

    const start = item.startDate || "";
    const end = item.endDate || "";

    if (start || end) {
      return `${start}${start && end ? " - " : ""}${end}`;
    }

    return "";
  };

  const getEducationTitle = (item) => {
    return (
      item.degree ||
      item.qualification ||
      item.title ||
      ""
    );
  };

  const getEducationInstitute = (item) => {
    return (
      item.institution ||
      item.university ||
      item.board ||
      ""
    );
  };

  const getEducationDate = (item) => {
    if (item.year) return item.year;
    if (item.date) return item.date;

    const start = item.startYear || "";
    const end = item.endYear || "";

    if (start || end) {
      return `${start}${start && end ? " - " : ""}${end}`;
    }

    return "";
  };

  const getLanguageName = (item) => {
    return item?.name || "";
  };

  const getLanguageLevel = (item) => {
    return (
      item?.level ||
      item?.proficiency ||
      "Intermediate"
    );
  };

  // =========================================================
  // GROUP SKILLS
  // =========================================================

  const technicalSkills = skills.filter(
    (skill) =>
      skill?.type === "Technical" ||
      !skill?.type
  );

  const softSkills = skills.filter(
    (skill) => skill?.type === "Soft"
  );

  // =========================================================
  // SECTION TITLE
  // =========================================================

  const SectionTitle = ({ icon, title }) => {
    return (
      <div className="developer-section-title">
        <div className="developer-section-icon">
          {icon}
        </div>

        <h2>{title}</h2>
      </div>
    );
  };

  // =========================================================
  // JSX
  // =========================================================

  return (
    <div className="developer-template">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="developer-header">

        <div className="developer-header-main">

          <div className="developer-profile">

            {getProfileImage() ? (
              <img
                src={getProfileImage()}
                alt={getFullName()}
                className="developer-profile-image"
              />
            ) : (
              <div className="developer-profile-placeholder">
                {getFullName()
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}

          </div>

          <div className="developer-header-info">

            <h1>
              {getFullName()}
            </h1>

            <h3>
              {getProfession()}
            </h3>

          </div>

        </div>

        {/* ===================================================
            CONTACT BAR
        =================================================== */}

        {(getEmail() ||
          getPhone() ||
          getLocation() ||
          socialLinks.linkedin) && (

          <div className="developer-contact-bar">

            {getEmail() && (
              <span className="developer-contact-item">
                <span className="developer-contact-icon">
                  ✉
                </span>
                {getEmail()}
              </span>
            )}

            {getPhone() && (
              <span className="developer-contact-item">
                <span className="developer-contact-icon">
                  ☎
                </span>
                {getPhone()}
              </span>
            )}

            {getLocation() && (
              <span className="developer-contact-item">
                <span className="developer-contact-icon">
                  ⌖
                </span>
                {getLocation()}
              </span>
            )}

            

          </div>
        )}

      </header>


      {/* =====================================================
          BODY
      ===================================================== */}

      <div className="developer-body">

        {/* ===================================================
            LEFT COLUMN
        =================================================== */}

        <main className="developer-main-column">

          {/* =================================================
              SUMMARY
          ================================================= */}

         {getSummary() && (
  <section className="developer-section">

    <SectionTitle
      icon="♙"
      title="PROFESSIONAL SUMMARY"
    />

    <p className="developer-summary">
      {getSummary()}
    </p>

  </section>
)}

          {/* =================================================
              EXPERIENCE
          ================================================= */}

          {experience.length > 0 && (
            <section className="developer-section">

              <SectionTitle
                icon="▣"
                title="EXPERIENCE"
              />

              <div className="developer-experience-list">

                {experience.map((item, index) => {

                  const title =
                    getExperienceTitle(item);

                  const company =
                    getExperienceCompany(item);

                  const date =
                    getExperienceDate(item);

                  const responsibilities =
                    Array.isArray(item.responsibilities)
                      ? item.responsibilities
                      : [];

                  return (
                    <article
                      className="developer-experience-item"
                      key={item._id || index}
                    >

                      <div className="developer-experience-heading">

                        <div>
                          <h3>
                            {title}
                          </h3>

                          {company && (
                            <h4>
                              {company}
                            </h4>
                          )}
                        </div>

                        {date && (
                          <span className="developer-date">
                            {date}
                          </span>
                        )}

                      </div>


                      {item.description && (
                        <p className="developer-description">
                          {item.description}
                        </p>
                      )}


                      {responsibilities.length > 0 && (
  <div className="developer-responsibilities">

    <strong>Responsibilities</strong>

    {responsibilities.map((responsibility, rIndex) => (
      <p
        key={rIndex}
        className="developer-responsibility-item"
      >
        {responsibility}
      </p>
    ))}

  </div>
)}

                    </article>
                  );
                })}

              </div>

            </section>
          )}


          {/* =================================================
              EDUCATION
          ================================================= */}

          {education.length > 0 && (
            <section className="developer-section-4">

              <SectionTitle
                icon="🎓"
                title="EDUCATION"
              />

              <div className="developer-education-list">

                {education.map((item, index) => (

                  <article
                    className="developer-education-item"
                    key={item._id || index}
                  >

                    <div className="developer-education-heading">

                      <div>

                        <h3>
                          {getEducationTitle(item)}
                        </h3>

                        <h4>
                          {getEducationInstitute(item)}
                        </h4>

                      </div>

                      {getEducationDate(item) && (
                        <span className="developer-date">
                          {getEducationDate(item)}
                        </span>
                      )}

                    </div>

                    {item.description && (
                      <p className="developer-description">
                        {item.description}
                      </p>
                    )}

                  </article>

                ))}

              </div>

            </section>
          )}


          {/* =================================================
              PROJECTS
          ================================================= */}

          {projects.length > 0 && (
            <section className="developer-section">

              <SectionTitle
                icon="▥"
                title="PROJECTS"
              />

              <div className="developer-project-list">

                {projects.map((project, index) => (

                  <article
                    className="developer-project-item"
                    key={project._id || index}
                  >

                    <h3>
                      {project.title ||
                        "Project"}
                    </h3>

                    {project.subtitle && (
                      <h4>
                        {project.subtitle}
                      </h4>
                    )}

                    {project.description && (
                      <p className="developer-description">
                        {project.description}
                      </p>
                    )}

                    {Array.isArray(
                      project.techStack
                    ) &&
                      project.techStack.length > 0 && (

                        <p className="developer-project-tech">
                          <strong>
                            Technologies:
                          </strong>{" "}
                          {project.techStack.join(
                            ", "
                          )}
                        </p>
                      )}

                    <div className="developer-project-links">

                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Live Demo
                        </a>
                      )}

                      {project.repoLink && (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                      )}

                    </div>

                  </article>

                ))}

              </div>

            </section>
          )}

        </main>


        {/* ===================================================
            RIGHT COLUMN
        =================================================== */}

        <aside className="developer-sidebar">

          {/* =================================================
              SKILLS
          ================================================= */}

          {technicalSkills.length > 0 && (
            <section className="developer-section">

              <SectionTitle
                icon="🚀"
                title="SKILLS"
              />

              <div className="developer-skills-list">

               {technicalSkills.flatMap((skill, index) => {

  const skillNames = Array.isArray(skill?.name)
    ? skill.name
    : [skill?.name || skill?.customName || ""];

  return skillNames
    .map((name) =>
      name === "Other"
        ? skill?.customName || ""
        : name
    )
    .filter(Boolean)
    .map((name, skillIndex) => (

      <div
        className="developer-skill-row"
        key={`${skill?._id || index}-${skillIndex}`}
      >

        <span className="developer-skill-name">
          {name}
        </span>

        {renderSkillDots(
          getSkillLevel(skill)
        )}

      </div>

    ));

})}

              </div>

            </section>
          )}


          {/* =================================================
              SOFT SKILLS
          ================================================= */}

          {softSkills.length > 0 && (
            <section className="developer-section">

              <SectionTitle
                icon="★"
                title="SOFT SKILLS"
              />

              <ul className="developer-soft-skills">
  {softSkills.flatMap((skill, index) => {
    const names = Array.isArray(skill?.name)
      ? skill.name
      : [skill?.name || skill?.customName || ""];

    return names
      .map((name) =>
        name === "Other"
          ? skill?.customName || ""
          : name
      )
      .filter(Boolean)
      .map((name, nameIndex) => (
        <li key={`${skill?._id || index}-${nameIndex}`}>
          {name}
        </li>
      ));
  })}
</ul>
            </section>
          )}


          {/* =================================================
              STRENGTHS
          ================================================= */}

          {strengths.length > 0 && (
            <section className="developer-section-1">

              <SectionTitle
                icon="✦"
                title="STRENGTHS"
              />

              <ul className="developer-strengths">
  {strengths
    .flatMap((strength) =>
      String(
        typeof strength === "string"
          ? strength
          : strength?.name || strength?.value || ""
      )
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


          {/* =================================================
              LANGUAGES
          ================================================= */}

          {languages.length > 0 && (
            <section className="developer-section">

              <SectionTitle
                icon="◎"
                title="LANGUAGES"
              />

              <div className="developer-languages">

                {languages.map(
                  (language, index) => (

                    <div
                      className="developer-language-row"
                      key={
                        language._id ||
                        index
                      }
                    >

                      <span>
                        {getLanguageName(
                          language
                        )}
                      </span>

                      {renderSkillDots(
                        getLanguageLevel(
                          language
                        )
                      )}

                    </div>

                  )
                )}

              </div>

            </section>
          )}


          {/* =================================================
              CERTIFICATIONS
          ================================================= */}
{certifications.length > 0 && (
  <section className="developer-section">

    <SectionTitle
      icon="▤"
      title="CERTIFICATION"
    />

    <div className="developer-certifications">

      {certifications.map((certification, index) => (

        <article
          className="developer-certification-item"
          key={certification._id || index}
        >

          {/* CERTIFICATION NAME + YEAR */}
          <div className="developer-certification-heading">

            <h3>
              {certification.name ||
                certification.title ||
                "Certification"}
            </h3>

            <span className="developer-cert-year">
              {certification.year ||
                certification.date ||
                certification.startYear ||
                ""}
            </span>

          </div>

          {/* ORGANIZATION */}
          {(certification.organization ||
            certification.issuer) && (
            <h4>
              {certification.organization ||
                certification.issuer}
            </h4>
          )}

         

          {/* CREDENTIAL */}
          {certification.credentialUrl && (
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Credential
            </a>
          )}

        </article>

      ))}

    </div>

  </section>
)}

          {/* =================================================
              SOCIAL LINKS
          ================================================= */}

          {(socialLinks.github ||
            socialLinks.linkedin ||
            socialLinks.twitter ||
            socialLinks.website) && (

            <section className="developer-section">

              <SectionTitle
                icon="⌘"
                title="LINKS"
              />

              <div className="developer-social-links">

                {socialLinks.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                )}

                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                )}

                {socialLinks.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                )}

                {socialLinks.website && (
                  <a
                    href={socialLinks.website}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Website
                  </a>
                )}

              </div>

            </section>
          )}

        </aside>

      </div>

    </div>
  );
};

export default DeveloperTemplate;