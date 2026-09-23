import React, { useEffect, useRef, useState } from "react";

const ProfileForm = ({ onProfileUpdated }) => {
  const [formData, setFormData] = useState({
    name: "",
    profession: "",
    bio: "",
    profileImage: "",
    resumeUrl: "",
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [showImageMenu, setShowImageMenu] = useState(false);

  const fileInputRef = useRef(null);

  // ==========================================
  // GET PROFILE
  // ==========================================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch profile"
          );
        }

        const user = data.user;

        setFormData({
          name: user.name || "",
          profession: user.profession || "",
          bio: user.bio || "",
          profileImage: user.profileImage || "",
          resumeUrl: user.resumeUrl || "",
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          twitter: user.socialLinks?.twitter || "",
          website: user.socialLinks?.website || "",
        });
      } catch (error) {
        console.error("Profile Load Error:", error);
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // PROFILE IMAGE CLICK
  // ==========================================
  const handleImageClick = () => {
    if (formData.profileImage) {
      setShowImageMenu(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  // ==========================================
  // SELECT IMAGE
  // ==========================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage("Image size must be less than 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));

      setMessage("");
    };

    reader.readAsDataURL(file);

    // Same image ko dobara select karne ke liye
    e.target.value = "";
  };

  // ==========================================
  // CHANGE PHOTO
  // ==========================================
  const handleChangePhoto = () => {
    setShowImageMenu(false);
    fileInputRef.current?.click();
  };

  // ==========================================
  // REMOVE PHOTO
  // ==========================================
  const handleRemovePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      profileImage: "",
    }));

    setShowImageMenu(false);
    setMessage("");
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/profile",
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            name: formData.name,
            profession: formData.profession,
            bio: formData.bio,
            profileImage: formData.profileImage,
            resumeUrl: formData.resumeUrl,

            socialLinks: {
              github: formData.github,
              linkedin: formData.linkedin,
              twitter: formData.twitter,
              website: formData.website,
            },
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Profile update failed"
        );
      }

      // ==========================================
      // DATABASE UPDATE KE BAAD LIVE PREVIEW REFRESH
      // ==========================================
      if (onProfileUpdated) {
        await onProfileUpdated();
      }

      setMessage(
        "Profile updated successfully ✅"
      );
    } catch (error) {
      console.error(
        "Profile Update Error:",
        error
      );

      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return <p>Loading profile...</p>;
  }

  // ==========================================
  // UI
  // ==========================================
  return (
    <div className="profile-form">

      <h2>Profile Information</h2>

      <form onSubmit={handleSubmit}>

        {/* ======================================
            PROFILE IMAGE
        ====================================== */}

        <div className="profile-image-section">

          <label>Profile Image</label>

          <div className="profile-image-container">

            <div
              className="profile-image-wrapper"
              onClick={handleImageClick}
              title="Click profile image"
            >
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="profile-image-preview"
                />
              ) : (
                <div className="profile-image-placeholder">
                  <span>+</span>
                  <small>Select Image</small>
                </div>
              )}
            </div>

            {/* IMAGE MENU */}

            {showImageMenu && (
              <div className="profile-image-menu">

                <button
                  type="button"
                  onClick={handleChangePhoto}
                >
                  Change Photo
                </button>

                <button
                  type="button"
                  className="remove-photo-btn"
                  onClick={handleRemovePhoto}
                >
                  Remove Photo
                </button>

                <button
                  type="button"
                  className="cancel-photo-btn"
                  onClick={() =>
                    setShowImageMenu(false)
                  }
                >
                  Cancel
                </button>

              </div>
            )}

          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <p className="profile-image-hint">
            Click profile image to change photo
          </p>

        </div>

        {/* ======================================
            NAME
        ====================================== */}

        <div className="form-group">

          <label>Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

        </div>

        {/* ======================================
            PROFESSION
        ====================================== */}

        <div className="form-group">

          <label>Profession</label>

          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
          />

        </div>

        {/* ======================================
            BIO
        ====================================== */}

        <div className="form-group">

          <label>Bio</label>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Write something about yourself"
            rows="4"
          />

        </div>

        {/* ======================================
            RESUME
        ====================================== */}

        <div className="form-group">

          <label>Resume URL</label>

          <div className="resume-url-row">
            <input
              type="url"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              placeholder="https://example.com/resume.pdf"
            />

            <button
              type="button"
              className="create-resume-btn"
              onClick={() => {
                window.location.href = "/resume-builder";
              }}
            >
              📄 Create Resume
            </button>
          </div>

          <small className="resume-url-help">
            Don't have a resume? Create one using CodeFolio Resume Builder.
          </small>

        </div>

        {/* ======================================
            SOCIAL LINKS
        ====================================== */}

        <h3>Social Links</h3>

        {/* GitHub */}

        <div className="form-group">

          <label>GitHub</label>

          <input
            type="url"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
          />

        </div>

        {/* LinkedIn */}

        <div className="form-group">

          <label>LinkedIn</label>

          <input
            type="url"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />

        </div>

        {/* Twitter */}

        <div className="form-group">

          <label>Twitter</label>

          <input
            type="url"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
          />

        </div>

        {/* Website */}

        <div className="form-group">

          <label>Website</label>

          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
          />

        </div>

        {/* ======================================
            SAVE BUTTON
        ====================================== */}

        <button
          type="submit"
          className="primary-btn"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Profile"}
        </button>

      </form>

      {/* ======================================
          MESSAGE
      ====================================== */}

      {message && (
        <p className="profile-message">
          {message}
        </p>
      )}

    </div>
  );
};

export default ProfileForm;