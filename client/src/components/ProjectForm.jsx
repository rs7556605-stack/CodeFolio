import React, {
  useEffect,
  useRef,
  useState,
} from "react";

// ==========================================
// EMPTY FORM
// ==========================================

const emptyForm = {
  title: "",
  description: "",
  category: "Other",
  customCategory: "",
  techStack: "",
  repoLink: "",
  liveLink: "",
  screenshot: "",
};

// ==========================================
// PROJECT CATEGORIES
// ==========================================

const projectCategories = [
  "Web Development",
  "AI / Machine Learning",
  "Mobile App",
  "Cyber Security",
  "Full Stack",
  "Frontend",
  "Backend",
  "Other",
];

const ProjectForm = ({
  editProject,
  onProjectCreated,
  onProjectUpdated,
  onCancelEdit,
}) => {
  const [formData, setFormData] =
    useState(emptyForm);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [imageProcessing, setImageProcessing] =
    useState(false);

  const fileInputRef =
    useRef(null);

  // ==========================================
  // LOAD PROJECT DATA FOR EDIT
  // ==========================================

  useEffect(() => {
    if (editProject) {
      const existingCategory =
        editProject.category || "Other";

      const isCustomCategory =
        existingCategory &&
        !projectCategories.includes(
          existingCategory
        );

      setFormData({
        title:
          editProject.title || "",

        description:
          editProject.description || "",

        category:
          isCustomCategory
            ? "Other"
            : existingCategory,

        customCategory:
          isCustomCategory
            ? existingCategory
            : "",

        techStack:
          editProject.techStack?.join(
            ", "
          ) || "",

        repoLink:
          editProject.repoLink || "",

        liveLink:
          editProject.liveLink || "",

        screenshot:
          editProject.screenshot || "",
      });

      setMessage("");
    } else {
      setFormData(emptyForm);
    }
  }, [editProject]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // COMPRESS PROJECT IMAGE
  // ==========================================

  const compressImage = (
    file,
    maxWidth = 1280,
    maxHeight = 1280,
    quality = 0.8
  ) => {
    return new Promise(
      (resolve, reject) => {
        const reader =
          new FileReader();

        reader.onload = (event) => {
          const image =
            new Image();

          image.onload = () => {
            let width =
              image.width;

            let height =
              image.height;

            // Resize width
            if (width > maxWidth) {
              height =
                (height *
                  maxWidth) /
                width;

              width =
                maxWidth;
            }

            // Resize height
            if (
              height >
              maxHeight
            ) {
              width =
                (width *
                  maxHeight) /
                height;

              height =
                maxHeight;
            }

            // Canvas
            const canvas =
              document.createElement(
                "canvas"
              );

            canvas.width =
              Math.round(width);

            canvas.height =
              Math.round(height);

            const context =
              canvas.getContext(
                "2d"
              );

            if (!context) {
              reject(
                new Error(
                  "Image processing is not supported."
                )
              );

              return;
            }

            // Better image rendering
            context.imageSmoothingEnabled =
              true;

            context.imageSmoothingQuality =
              "high";

            context.drawImage(
              image,
              0,
              0,
              canvas.width,
              canvas.height
            );

            // Convert to JPEG
            const compressedImage =
              canvas.toDataURL(
                "image/jpeg",
                quality
              );

            resolve(
              compressedImage
            );
          };

          image.onerror = () => {
            reject(
              new Error(
                "Unable to load selected image."
              )
            );
          };

          image.src =
            event.target.result;
        };

        reader.onerror = () => {
          reject(
            new Error(
              "Unable to read selected image."
            )
          );
        };

        reader.readAsDataURL(
          file
        );
      }
    );
  };

  // ==========================================
  // SELECT PROJECT SCREENSHOT
  // ==========================================

  const handleScreenshotChange =
    async (e) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      // Image type check
      if (
        !file.type.startsWith(
          "image/"
        )
      ) {
        setMessage(
          "Please select a valid image file."
        );

        e.target.value = "";

        return;
      }

      // Original size check
      if (
        file.size >
        10 * 1024 * 1024
      ) {
        setMessage(
          "Original image must be less than 10 MB."
        );

        e.target.value = "";

        return;
      }

      try {
        setImageProcessing(
          true
        );

        setMessage(
          "Optimizing project screenshot..."
        );

        const optimizedImage =
          await compressImage(
            file,
            1280,
            1280,
            0.8
          );

        setFormData(
          (prev) => ({
            ...prev,
            screenshot:
              optimizedImage,
          })
        );

        setMessage(
          "Project screenshot optimized successfully ✅"
        );
      } catch (error) {
        console.error(
          "Screenshot Optimization Error:",
          error
        );

        setMessage(
          "Failed to optimize image."
        );
      } finally {
        setImageProcessing(
          false
        );

        e.target.value = "";
      }
    };

  // ==========================================
  // REMOVE SCREENSHOT
  // ==========================================

  const handleRemoveScreenshot =
    () => {
      setFormData(
        (prev) => ({
          ...prev,
          screenshot: "",
        })
      );

      setMessage("");
    };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageProcessing) {
      setMessage(
        "Please wait until image optimization is complete."
      );

      return;
    }

    if (!formData.title.trim()) {
      setMessage(
        "Project title is required."
      );

      return;
    }

    if (
      !formData.description.trim()
    ) {
      setMessage(
        "Project description is required."
      );

      return;
    }

    // ========================================
    // GET FINAL CATEGORY
    // ========================================

    let finalCategory =
      formData.category;

    if (
      formData.category ===
      "Other"
    ) {
      if (
        formData.customCategory.trim()
      ) {
        finalCategory =
          formData.customCategory.trim();
      } else {
        finalCategory =
          "Other";
      }
    }

    setSaving(true);

    setMessage("");

    try {
      const token =
        localStorage.getItem(
          "token"
        );

      if (!token) {
        throw new Error(
          "Session expired. Please login again."
        );
      }

      // ========================================
      // PROJECT DATA
      // ========================================

      const projectData = {
        title:
          formData.title.trim(),

        description:
          formData.description.trim(),

        category:
          finalCategory,

        techStack:
          formData.techStack
            .split(",")
            .map(
              (item) =>
                item.trim()
            )
            .filter(Boolean),

        repoLink:
          formData.repoLink.trim(),

        liveLink:
          formData.liveLink.trim(),

        screenshot:
          formData.screenshot,
      };

      // ========================================
      // UPDATE PROJECT
      // ========================================

      if (editProject) {
        const response =
          await fetch(
            `http://localhost:5000/api/projects/${editProject._id}`,
            {
              method: "PUT",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`,
              },

              body: JSON.stringify(
                projectData
              ),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Project update failed"
          );
        }

        setMessage(
          "Project updated successfully ✅"
        );

        if (
          onProjectUpdated
        ) {
          onProjectUpdated(
            data.project
          );
        }

        return;
      }

      // ========================================
      // CREATE PROJECT
      // ========================================

      const response =
        await fetch(
          "http://localhost:5000/api/projects",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`,
            },

            body: JSON.stringify(
              projectData
            ),
          }
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Project creation failed"
        );
      }

      setMessage(
        "Project created successfully ✅"
      );

      setFormData({
        ...emptyForm,
      });

      if (
        onProjectCreated
      ) {
        onProjectCreated(
          data.project
        );
      }
    } catch (error) {
      console.error(
        "Project Error:",
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

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="project-form">

      <h2>
        {editProject
          ? "Edit Project"
          : "Add New Project"}
      </h2>

      <form
        onSubmit={handleSubmit}
      >

        {/* ======================================
            PROJECT TITLE
        ====================================== */}

        <div className="form-group">

          <label>
            Project Title
          </label>

          <input
            type="text"
            name="title"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            placeholder="Enter project title"
            required
          />

        </div>

        {/* ======================================
            DESCRIPTION
        ====================================== */}

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            placeholder="Describe your project"
            rows="5"
            required
          />

        </div>

        {/* ======================================
            PROJECT CATEGORY
        ====================================== */}

        <div className="form-group">

          <label>
            Project Category
          </label>

          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
          >
            {projectCategories.map(
              (category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              )
            )}
          </select>

          <small>
            Choose a category.
          </small>

        </div>

        {/* ======================================
            CUSTOM CATEGORY
        ====================================== */}

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
              placeholder="e.g. Blockchain"
              maxLength={50}
            />

            <small>
              Enter your category.
            </small>

          </div>
        )}

        {/* ======================================
            TECH STACK
        ====================================== */}

        <div className="form-group">

          <label>
            Tech Stack
          </label>

          <input
            type="text"
            name="techStack"
            value={
              formData.techStack
            }
            onChange={
              handleChange
            }
            placeholder="React, Node.js, MongoDB"
          />

          <small>
            Separate technologies
            using commas.
          </small>

        </div>

        {/* ======================================
            REPOSITORY
        ====================================== */}

        <div className="form-group">

          <label>
            Repository Link
          </label>

          <input
            type="url"
            name="repoLink"
            value={
              formData.repoLink
            }
            onChange={
              handleChange
            }
            placeholder="https://github.com/username/project"
          />

        </div>

        {/* ======================================
            LIVE LINK
        ====================================== */}

        <div className="form-group">

          <label>
            Live Project Link
          </label>

          <input
            type="url"
            name="liveLink"
            value={
              formData.liveLink
            }
            onChange={
              handleChange
            }
            placeholder="https://example.com"
          />

        </div>

        {/* ======================================
            PROJECT SCREENSHOT
        ====================================== */}

        <div className="form-group">

          <label>
            Project Screenshot
          </label>

          {/* IMAGE UPLOAD */}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={
              handleScreenshotChange
            }
          />

          <small>
            Upload an image. It will
            be automatically resized
            and compressed.
          </small>

          {/* IMAGE URL */}

          <div
            style={{
              marginTop:
                "12px",
              marginBottom:
                "8px",
              fontWeight:
                "600",
              color:
                "#6b7280",
            }}
          >
            OR
          </div>

          <input
            type="url"
            name="screenshot"
            value={
              formData.screenshot.startsWith(
                "data:image/"
              )
                ? ""
                : formData.screenshot
            }
            onChange={
              handleChange
            }
            placeholder="https://example.com/project.jpg"
          />

          {/* IMAGE PROCESSING */}

          {imageProcessing && (
            <p
              style={{
                marginTop:
                  "10px",
                color:
                  "#2563eb",
                fontWeight:
                  "600",
              }}
            >
              Optimizing image...
              ⏳
            </p>
          )}

          {/* PREVIEW */}

          {formData.screenshot && (
            <div
              style={{
                marginTop:
                  "15px",
              }}
            >

              <p
                style={{
                  marginBottom:
                    "8px",
                  fontWeight:
                    "600",
                }}
              >
                Screenshot Preview
              </p>

              <img
                src={
                  formData.screenshot
                }
                alt="Project screenshot preview"
                style={{
                  display:
                    "block",
                  width:
                    "100%",
                  maxWidth:
                    "600px",
                  maxHeight:
                    "300px",
                  objectFit:
                    "cover",
                  borderRadius:
                    "10px",
                  border:
                    "1px solid #e5e7eb",
                }}
              />

              {/* REMOVE IMAGE */}

              <button
                type="button"
                onClick={
                  handleRemoveScreenshot
                }
                style={{
                  marginTop:
                    "10px",
                  padding:
                    "8px 14px",
                  border:
                    "none",
                  borderRadius:
                    "7px",
                  background:
                    "#ef4444",
                  color:
                    "#ffffff",
                  cursor:
                    "pointer",
                  fontWeight:
                    "600",
                }}
              >
                Remove Screenshot
              </button>

            </div>
          )}

        </div>

        {/* ======================================
            BUTTONS
        ====================================== */}

        <button
          type="submit"
          className="primary-btn"
          disabled={
            saving ||
            imageProcessing
          }
        >
          {saving
            ? "Saving..."
            : editProject
              ? "Update Project"
              : "Create Project"}
        </button>

        {/* CANCEL */}

        {editProject && (
          <button
            type="button"
            className="cancel-btn"
            onClick={
              onCancelEdit
            }
            disabled={saving}
          >
            Cancel
          </button>
        )}

      </form>

      {/* MESSAGE */}

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default ProjectForm;