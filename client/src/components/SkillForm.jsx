import React, { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  category: "Frontend",
  customCategory: "",
  level: "Beginner",
};

const SkillForm = ({
  editSkill,
  onSkillCreated,
  onSkillUpdated,
  onCancelEdit,
}) => {
  const [formData, setFormData] = useState(emptyForm);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  // =========================================================
  // EDIT SKILL / RESET FORM
  // =========================================================

  useEffect(() => {
    if (editSkill) {
      const predefinedCategories = [
        "Frontend",
        "Backend",
        "DevOps",
        "Database",
        "Programming",
      ];

      const savedCategory =
        editSkill.category || "Frontend";

      const isCustomCategory =
        !predefinedCategories.includes(
          savedCategory
        );

      setFormData({
        name: editSkill.name || "",

        category: isCustomCategory
          ? "Other"
          : savedCategory,

        customCategory: isCustomCategory
          ? savedCategory
          : "",

        level:
          editSkill.level || "Beginner",
      });

      setMessage("");
    } else {
      setFormData({
        ...emptyForm,
      });

      setMessage("");
    }
  }, [editSkill]);

  // =========================================================
  // HANDLE CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE CATEGORY CHANGE
  // =========================================================

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,

      category: value,

      // Other select karne par custom field empty rakho
      customCategory:
        value === "Other"
          ? prev.customCategory
          : "",
    }));
  };

  // =========================================================
  // HANDLE SUBMIT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Session expired. Please login again."
        );
      }

      // =====================================================
      // VALIDATE CUSTOM CATEGORY
      // =====================================================

      if (
        formData.category === "Other" &&
        !formData.customCategory.trim()
      ) {
        throw new Error(
          "Please enter a custom category."
        );
      }

      // =====================================================
      // FINAL CATEGORY
      // =====================================================

      const finalCategory =
        formData.category === "Other"
          ? formData.customCategory.trim()
          : formData.category;

      // =====================================================
      // SKILL DATA
      // =====================================================

      const skillData = {
        name: formData.name.trim(),

        category: finalCategory,

        level: formData.level,
      };

      console.log(
        "Skill Data:",
        skillData
      );

      let response;

      // =====================================================
      // UPDATE
      // =====================================================

      if (editSkill) {
        response = await fetch(
          `http://localhost:5000/api/skills/${editSkill._id}`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              skillData
            ),
          }
        );
      }

      // =====================================================
      // CREATE
      // =====================================================

      else {
        response = await fetch(
          "http://localhost:5000/api/skills",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              skillData
            ),
          }
        );
      }

      // =====================================================
      // RESPONSE
      // =====================================================

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Skill operation failed"
        );
      }

      // =====================================================
      // UPDATE SUCCESS
      // =====================================================

      if (editSkill) {
        setMessage(
          "Skill updated successfully ✅"
        );

        if (onSkillUpdated) {
          onSkillUpdated(
            data.skill
          );
        }
      }

      // =====================================================
      // CREATE SUCCESS
      // =====================================================

      else {
        setMessage(
          "Skill created successfully ✅"
        );

        setFormData({
          ...emptyForm,
        });

        if (onSkillCreated) {
          onSkillCreated(
            data.skill
          );
        }
      }

    } catch (error) {
      console.error(
        "Skill Error:",
        error
      );

      setMessage(
        error.message ||
          "Something went wrong"
      );

    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="skill-form">

      <h2>
        {editSkill
          ? "Edit Skill"
          : "Add New Skill"}
      </h2>

      <form
        onSubmit={handleSubmit}
      >

        {/* =================================================
            SKILL NAME
        ================================================= */}

        <div className="form-group">

          <label>
            Skill Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. React"
            required
          />

        </div>


        {/* =================================================
            CATEGORY
        ================================================= */}

        {/* =================================================
    CATEGORY + SKILL LEVEL
================================================= */}

<div className="skill-category-level-row">

  {/* CATEGORY */}

  <div className="form-group">

    <label>
      Category
    </label>

    <select
      name="category"
      value={formData.category}
      onChange={handleCategoryChange}
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

      <option value="Database">
        Database
      </option>

      <option value="Programming">
        Programming
      </option>

      <option value="Other">
        Other
      </option>
    </select>

  </div>


  {/* SKILL LEVEL */}

  <div className="form-group">

    <label>
      Skill Level
    </label>

    <select
      name="level"
      value={formData.level}
      onChange={handleChange}
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

        {/* =================================================
            CUSTOM CATEGORY
        ================================================= */}

        {formData.category ===
          "Other" && (

          <div className="form-group">

            <label>
              Custom Category
            </label>

            <input
              type="text"
              name="customCategory"
              value={
                formData.customCategory
              }
              onChange={
                handleChange
              }
              placeholder="e.g. AI / Machine Learning"
              required
            />

          </div>
        )}


       

        {/* =================================================
            BUTTON
        ================================================= */}

        <button
          type="submit"
          className="primary-btn"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editSkill
            ? "Update Skill"
            : "Add Skill"}
        </button>


        {/* =================================================
            CANCEL
        ================================================= */}

        {editSkill && (
          <button
            type="button"
            className="cancel-btn"
            onClick={
              onCancelEdit
            }
          >
            Cancel
          </button>
        )}

      </form>


      {/* =================================================
          MESSAGE
      ================================================= */}

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default SkillForm;