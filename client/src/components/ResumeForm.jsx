import React from "react";

const ResumeForm = ({
  resume,
  saving,

  handlePersonalChange,
  handleSummaryChange,
  handleSocialChange,

  addEducation,
  updateEducation,
  removeEducation,

  addExperience,
  updateExperience,
  removeExperience,

  addSkill,
  updateSkill,
  removeSkill,

  addProject,
  updateProject,
  removeProject,

  addCertification,
  updateCertification,
  removeCertification,

  addLanguage,
  updateLanguage,
  removeLanguage,

  handleTemplateChange,
  handleSave,
}) => {

  return (
    <div className="resume-form">

      {/* =========================
          PERSONAL INFORMATION
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>01</span>

          <div>
            <h2>
              Personal Information
            </h2>

            <p>
              Add your basic contact details.
            </p>
          </div>

        </div>

        <div className="resume-grid">

          <div className="resume-field">

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={
                resume.personalInfo?.fullName || ""
              }
              onChange={handlePersonalChange}
              placeholder="Enter your full name"
            />

          </div>

          <div className="resume-field">

            <label>
              Profession
            </label>

            <input
              type="text"
              name="profession"
              value={
                resume.personalInfo?.profession || ""
              }
              onChange={handlePersonalChange}
              placeholder="e.g. Full Stack Developer"
            />

          </div>

          <div className="resume-field">

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={
                resume.personalInfo?.email || ""
              }
              onChange={handlePersonalChange}
              placeholder="you@example.com"
            />

          </div>

          <div className="resume-field">

            <label>
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={
                resume.personalInfo?.phone || ""
              }
              onChange={handlePersonalChange}
              placeholder="+91 XXXXX XXXXX"
            />

          </div>

          <div className="resume-field full-width">

            <label>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={
                resume.personalInfo?.location || ""
              }
              onChange={handlePersonalChange}
              placeholder="City, State, Country"
            />

          </div>

        </div>

      </section>

      {/* =========================
          SUMMARY
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>02</span>

          <div>
            <h2>
              Professional Summary
            </h2>

            <p>
              Write a short introduction
              about yourself.
            </p>
          </div>

        </div>

        <div className="resume-field">

          <textarea
            rows="6"
            value={resume.summary || ""}
            onChange={handleSummaryChange}
            placeholder="Write your professional summary..."
          />

        </div>

      </section>

      {/* =========================
          EDUCATION
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>03</span>

          <div>
            <h2>
              Education
            </h2>

            <p>
              Add your educational
              qualifications.
            </p>
          </div>

        </div>

        {resume.education?.map(
          (education, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Education #{index + 1}
                </h3>

                <button
                  type="button"
                  className="resume-remove-btn"
                  onClick={() =>
                    removeEducation(index)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="resume-grid">

                <div className="resume-field">

                  <label>
                    Degree / Qualification
                  </label>

                  <input
                    type="text"
                    value={
                      education.degree || ""
                    }
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "degree",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Integrated MCA"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Institution
                  </label>

                  <input
                    type="text"
                    value={
                      education.institution || ""
                    }
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "institution",
                        e.target.value
                      )
                    }
                    placeholder="University / College"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Year
                  </label>

                  <input
                    type="text"
                    value={
                      education.year || ""
                    }
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "year",
                        e.target.value
                      )
                    }
                    placeholder="2026"
                  />

                </div>

                <div className="resume-field full-width">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="3"
                    value={
                      education.description || ""
                    }
                    onChange={(e) =>
                      updateEducation(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Additional details..."
                  />

                </div>

              </div>

            </div>
          )
        )}

        <button
          type="button"
          className="resume-add-btn"
          onClick={addEducation}
        >
          + Add Education
        </button>

      </section>

      {/* =========================
          EXPERIENCE
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>04</span>

          <div>
            <h2>
              Experience
            </h2>

            <p>
              Add internships and work
              experience.
            </p>
          </div>

        </div>

        {resume.experience?.map(
          (experience, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Experience #{index + 1}
                </h3>

                <button
                  type="button"
                  className="resume-remove-btn"
                  onClick={() =>
                    removeExperience(index)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="resume-grid">

                <div className="resume-field">

                  <label>
                    Job Title
                  </label>

                  <input
                    type="text"
                    value={
                      experience.jobTitle || ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "jobTitle",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Software Developer Intern"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Company
                  </label>

                  <input
                    type="text"
                    value={
                      experience.company || ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "company",
                        e.target.value
                      )
                    }
                    placeholder="Company name"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Start Date
                  </label>

                  <input
                    type="text"
                    value={
                      experience.startDate || ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "startDate",
                        e.target.value
                      )
                    }
                    placeholder="Jan 2025"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    End Date
                  </label>

                  <input
                    type="text"
                    value={
                      experience.endDate || ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "endDate",
                        e.target.value
                      )
                    }
                    placeholder="Present"
                  />

                </div>

                <div className="resume-field full-width">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="4"
                    value={
                      experience.description || ""
                    }
                    onChange={(e) =>
                      updateExperience(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe your responsibilities and achievements..."
                  />

                </div>

              </div>

            </div>
          )
        )}

        <button
          type="button"
          className="resume-add-btn"
          onClick={addExperience}
        >
          + Add Experience
        </button>

      </section>

      {/* =========================
          SKILLS
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>05</span>

          <div>
            <h2>
              Skills
            </h2>

            <p>
              Add your technical skills.
            </p>
          </div>

        </div>

        {resume.skills?.map(
          (skill, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Skill #{index + 1}
                </h3>

                <button
                  type="button"
                  className="resume-remove-btn"
                  onClick={() =>
                    removeSkill(index)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="resume-grid">

                <div className="resume-field">

                  <label>
                    Skill Name
                  </label>

                  <input
                    type="text"
                    value={
                      skill.name || ""
                    }
                    onChange={(e) =>
                      updateSkill(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="e.g. React"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Category
                  </label>

                  <select
                    value={
                      skill.category || "Frontend"
                    }
                    onChange={(e) =>
                      updateSkill(
                        index,
                        "category",
                        e.target.value
                      )
                    }
                  >
                    <option value="Frontend">
                      Frontend
                    </option>

                    <option value="Backend">
                      Backend
                    </option>

                    <option value="DevOps">
                      DevOps
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>

                </div>

                <div className="resume-field">

                  <label>
                    Level
                  </label>

                  <select
                    value={
                      skill.level || "Beginner"
                    }
                    onChange={(e) =>
                      updateSkill(
                        index,
                        "level",
                        e.target.value
                      )
                    }
                  >
                    <option value="Beginner">
                      Beginner
                    </option>

                    <option value="Intermediate">
                      Intermediate
                    </option>

                    <option value="Advanced">
                      Advanced
                    </option>
                  </select>

                </div>

              </div>

            </div>
          )
        )}

        <button
          type="button"
          className="resume-add-btn"
          onClick={addSkill}
        >
          + Add Skill
        </button>

      </section>

      {/* =========================
          PROJECTS
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>06</span>

          <div>
            <h2>
              Projects
            </h2>

            <p>
              Add your important projects.
            </p>
          </div>

        </div>

        {resume.projects?.map(
          (project, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Project #{index + 1}
                </h3>

                <button
                  type="button"
                  className="resume-remove-btn"
                  onClick={() =>
                    removeProject(index)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="resume-grid">

                <div className="resume-field">

                  <label>
                    Project Title
                  </label>

                  <input
                    type="text"
                    value={
                      project.title || ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder="Project name"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Tech Stack
                  </label>

                  <input
                    type="text"
                    value={
                      project.techStack?.join(
                        ", "
                      ) || ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "techStack",
                        e.target.value
                      )
                    }
                    placeholder="React, Node.js, MongoDB"
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Repository Link
                  </label>

                  <input
                    type="url"
                    value={
                      project.repoLink || ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "repoLink",
                        e.target.value
                      )
                    }
                    placeholder="https://github.com/..."
                  />

                </div>

                <div className="resume-field">

                  <label>
                    Live Demo Link
                  </label>

                  <input
                    type="url"
                    value={
                      project.liveLink || ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "liveLink",
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                  />

                </div>

                <div className="resume-field full-width">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="4"
                    value={
                      project.description || ""
                    }
                    onChange={(e) =>
                      updateProject(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Describe your project..."
                  />

                </div>

              </div>

            </div>
          )
        )}

        <button
          type="button"
          className="resume-add-btn"
          onClick={addProject}
        >
          + Add Project
        </button>

      </section>

      {/* CERTIFICATIONS */}

<section className="resume-form-section">
  <div className="resume-section-title">
    <span>07</span>
    <div>
      <h2>Certifications & Training</h2>
      <p>Add your certifications and professional training.</p>
    </div>
  </div>

  {(resume.certifications || []).map(
  (item, index) => (
    <div
      className="resume-repeat-card"
      key={index}
    >
      <div className="resume-repeat-header">
        <h3>
          Certification #{index + 1}
        </h3>

        <button
          type="button"
          className="resume-remove-btn"
          onClick={() =>
            removeCertification(index)
          }
        >
          Remove
        </button>
      </div>

      <div className="resume-grid">

        <div className="resume-field">
          <label>
            Certification Name
          </label>

          <input
            type="text"
            value={item.name || ""}
            onChange={(e) =>
              updateCertification(
                index,
                "name",
                e.target.value
              )
            }
            placeholder="e.g. Full Stack Web Development"
          />
        </div>

        <div className="resume-field">
          <label>
            Issuing Organization
          </label>

          <input
            type="text"
            value={item.issuer || ""}
            onChange={(e) =>
              updateCertification(
                index,
                "issuer",
                e.target.value
              )
            }
            placeholder="e.g. Coursera"
          />
        </div>

        <div className="resume-field">
          <label>
            Year
          </label>

          <input
            type="text"
            value={item.year || ""}
            onChange={(e) =>
              updateCertification(
                index,
                "year",
                e.target.value
              )
            }
            placeholder="2026"
          />
        </div>

      </div>
    </div>
  )
)}
  <button
    type="button"
    className="add-btn"
    onClick={addCertification}
  >
    + Add Certification
  </button>
</section>

{/* LANGUAGES */}

<section className="resume-form-section">
  <div className="resume-section-title">
    <span>08</span>
    <div>
      <h2>Languages</h2>
      <p>Add languages you know.</p>
    </div>
  </div>

 {(resume.languages || []).map(
  (item, index) => (
    <div
      className="resume-repeat-card"
      key={index}
    >
      <div className="resume-repeat-header">
        <h3>
          Language #{index + 1}
        </h3>

        <button
          type="button"
          className="resume-remove-btn"
          onClick={() =>
            removeLanguage(index)
          }
        >
          Remove
        </button>
      </div>

      <div className="resume-grid">

        <div className="resume-field">
          <label>
            Language
          </label>

          <input
            type="text"
            value={item.name || ""}
            onChange={(e) =>
              updateLanguage(
                index,
                "name",
                e.target.value
              )
            }
            placeholder="e.g. English"
          />
        </div>

        <div className="resume-field">
          <label>
            Proficiency
          </label>

          <select
            value={item.level || ""}
            onChange={(e) =>
              updateLanguage(
                index,
                "level",
                e.target.value
              )
            }
          >
            <option value="">
              Select Level
            </option>

            <option value="Basic">
              Basic
            </option>

            <option value="Intermediate">
              Intermediate
            </option>

            <option value="Fluent">
              Fluent
            </option>

            <option value="Native">
              Native
            </option>
          </select>
        </div>

      </div>
    </div>
  )
)}

  <button
    type="button"
    className="add-btn"
    onClick={addLanguage}
  >
    + Add Language
  </button>
</section>

      {/* =========================
          SOCIAL LINKS
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>07</span>

          <div>
            <h2>
              Social Links
            </h2>

            <p>
              Add your professional links.
            </p>
          </div>

        </div>

        <div className="resume-grid">

          <div className="resume-field">

            <label>
              GitHub
            </label>

            <input
              type="url"
              name="github"
              value={
                resume.socialLinks?.github || ""
              }
              onChange={handleSocialChange}
              placeholder="https://github.com/username"
            />

          </div>

          <div className="resume-field">

            <label>
              LinkedIn
            </label>

            <input
              type="url"
              name="linkedin"
              value={
                resume.socialLinks?.linkedin || ""
              }
              onChange={handleSocialChange}
              placeholder="https://linkedin.com/in/username"
            />

          </div>

          <div className="resume-field">

            <label>
              Twitter / X
            </label>

            <input
              type="url"
              name="twitter"
              value={
                resume.socialLinks?.twitter || ""
              }
              onChange={handleSocialChange}
              placeholder="https://x.com/username"
            />

          </div>

          <div className="resume-field">

            <label>
              Personal Website
            </label>

            <input
              type="url"
              name="website"
              value={
                resume.socialLinks?.website || ""
              }
              onChange={handleSocialChange}
              placeholder="https://yourwebsite.com"
            />

          </div>

        </div>

      </section>

      {/* =========================
          TEMPLATE
      ========================== */}

      <section className="resume-card">

        <div className="resume-section-title">

          <span>08</span>

          <div>
            <h2>
              Resume Template
            </h2>

            <p>
              Choose your resume design.
            </p>
          </div>

        </div>

        <div className="resume-template-options">

          <label
            className={
              resume.templateId ===
              "professional"
                ? "resume-template-option active"
                : "resume-template-option"
            }
          >

            <input
              type="radio"
              name="resumeTemplate"
              value="professional"
              checked={
                resume.templateId ===
                "professional"
              }
              onChange={handleTemplateChange}
            />

            <span>
              Professional
            </span>

          </label>

          <label
            className={
              resume.templateId ===
              "modern"
                ? "resume-template-option active"
                : "resume-template-option"
            }
          >

            <input
              type="radio"
              name="resumeTemplate"
              value="modern"
              checked={
                resume.templateId ===
                "modern"
              }
              onChange={handleTemplateChange}
            />

            <span>
              Modern
            </span>

          </label>

        </div>

      </section>

      {/* =========================
          SAVE
      ========================== */}

      <div className="resume-save-section">

        <button
          type="button"
          className="resume-save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "💾 Save Resume"}
        </button>

      </div>

    </div>
  );
};

export default ResumeForm;