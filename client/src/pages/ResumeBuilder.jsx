import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import "./ResumeBuilder.css";

import ResumePreview from "../components/ResumePreview";

const API_URL = "http://localhost:5000";

/* =========================================================
   EMPTY OBJECTS
========================================================= */

const emptyEducation = {
  degree: "",
  institution: "",
  year: "",
  description: "",
};

const emptyExperience = {
  jobTitle: "",
  company: "",
  startDate: "",
  endDate: "",
  description: "",
  responsibilities: [],
};
const emptySkill = {
  type: "Technical",
  name: [],
  customName: "",
  category: "Information Technology (IT)",
  customCategory: "",
  expertise: "Programming Languages",
  customExpertise: "",
  level: "Beginner",
}

const technicalSkillOptions = {
  "Information Technology (IT)": {
    "Programming Languages": [
      "Python",
      "Java",
      "C++",
      "C",
      "JavaScript",
      "TypeScript",
      "C#",
      "PHP",
      "Ruby",
      "Go",
      "Kotlin",
      "Swift",
      "Other",
    ],

    Cybersecurity: [
      "Network Security",
      "Ethical Hacking",
      "Penetration Testing",
      "Vulnerability Assessment",
      "Cryptography",
      "Security Auditing",
      "Other",
    ],

    "Network Architecture": [
      "TCP/IP",
      "LAN/WAN",
      "Routing",
      "Switching",
      "Network Design",
      "Firewalls",
      "DNS",
      "VPN",
      "Other",
    ],

    "Cloud Management": [
      "AWS",
      "Microsoft Azure",
      "Google Cloud",
      "Cloud Security",
      "Cloud Infrastructure",
      "Docker",
      "Kubernetes",
      "Other",
    ],

    "Machine Learning": [
      "Python",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Deep Learning",
      "Natural Language Processing",
      "Computer Vision",
      "Other",
    ],

    "Web Development": [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "REST API",
      "Tailwind CSS",
      "Other",
    ],

    "Database Management": [
      "MySQL",
      "MongoDB",
      "PostgreSQL",
      "Oracle",
      "SQL Server",
      "Database Design",
      "Database Administration",
      "Other",
    ],

    "Software Development": [
      "Software Design",
      "Object-Oriented Programming",
      "Git",
      "GitHub",
      "Testing",
      "Debugging",
      "API Development",
      "Other",
    ],

    DevOps: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Jenkins",
      "Linux",
      "AWS",
      "Other",
    ],
  },

  "Data Analysis": {
    "Statistical Analysis": [
      "Statistical Analysis",
      "Descriptive Statistics",
      "Regression Analysis",
      "Hypothesis Testing",
      "Other",
    ],

    Excel: [
      "Microsoft Excel",
      "Advanced Excel",
      "Pivot Tables",
      "VLOOKUP",
      "XLOOKUP",
      "Excel Charts",
      "Other",
    ],

    SQL: [
      "MySQL",
      "PostgreSQL",
      "SQL Server",
      "Oracle SQL",
      "SQL Queries",
      "Database Queries",
      "Other",
    ],

    "Data Visualization": [
      "Power BI",
      "Tableau",
      "Excel Charts",
      "Data Visualization",
      "Dashboard Development",
      "Other",
    ],

    "Big Data Management": [
      "Hadoop",
      "Apache Spark",
      "Big Data Analytics",
      "Data Processing",
      "Data Warehousing",
      "Other",
    ],

    "Data Cleaning": [
      "Data Cleaning",
      "Data Preprocessing",
      "Data Transformation",
      "Missing Data Handling",
      "Other",
    ],

    "Data Reporting": [
      "Data Reporting",
      "Business Reporting",
      "Dashboard Development",
      "Report Automation",
      "Other",
    ],

    "Power BI": [
      "Power BI",
      "Power Query",
      "DAX",
      "Data Modeling",
      "Dashboard Development",
      "Other",
    ],
  },

  "Project Management": {
    "Project Management Tools": [
      "Microsoft Project",
      "Jira",
      "Trello",
      "Asana",
      "Monday.com",
      "Other",
    ],

    Agile: [
      "Agile",
      "Scrum",
      "Kanban",
      "Sprint Planning",
      "Other",
    ],

    Scrum: [
      "Scrum",
      "Sprint Planning",
      "Daily Stand-up",
      "Sprint Review",
      "Sprint Retrospective",
      "Other",
    ],

    "Project Planning": [
      "Project Planning",
      "Resource Planning",
      "Task Management",
      "Timeline Planning",
      "Other",
    ],

    "Project Tracking": [
      "Jira",
      "Trello",
      "Progress Tracking",
      "Task Tracking",
      "Milestone Tracking",
      "Other",
    ],

    "Risk Management": [
      "Risk Assessment",
      "Risk Analysis",
      "Risk Mitigation",
      "Project Risk Management",
      "Other",
    ],
  },

  "Digital Marketing": {
    SEO: [
      "SEO",
      "Keyword Research",
      "On-Page SEO",
      "Off-Page SEO",
      "Technical SEO",
      "Other",
    ],

    "Social Media Analytics": [
      "Social Media Analytics",
      "Instagram Analytics",
      "Facebook Analytics",
      "YouTube Analytics",
      "Social Media Strategy",
      "Other",
    ],

    "Content Management Systems": [
      "WordPress",
      "Drupal",
      "Joomla",
      "Content Management",
      "Other",
    ],

    "Email Marketing": [
      "Email Marketing",
      "Mailchimp",
      "Email Campaigns",
      "Email Automation",
      "Other",
    ],

    "Google Analytics": [
      "Google Analytics",
      "GA4",
      "Website Analytics",
      "Traffic Analysis",
      "Other",
    ],

    "Content Strategy": [
      "Content Strategy",
      "Content Planning",
      "Content Writing",
      "Content Marketing",
      "Other",
    ],

    "Keyword Research": [
      "Keyword Research",
      "Keyword Analysis",
      "SEO Research",
      "Competitor Analysis",
      "Other",
    ],
  },

  "Healthcare and Science": {
    "Data Analysis": [
      "Statistical Analysis",
      "Excel",
      "SQL",
      "Data Visualization",
      "Python",
      "Other",
    ],

    Research: [
      "Research",
      "Research Methodology",
      "Data Collection",
      "Research Documentation",
      "Other",
    ],

    "Scientific Computing": [
      "Python",
      "MATLAB",
      "R",
      "Scientific Computing",
      "Data Analysis",
      "Other",
    ],

    "Healthcare Technology": [
      "Health Informatics",
      "Healthcare Data",
      "Medical Software",
      "Healthcare Technology",
      "Other",
    ],

    "Data Management": [
      "Data Management",
      "Database Management",
      "Data Security",
      "Data Quality",
      "Other",
    ],

    "Research Documentation": [
      "Research Documentation",
      "Technical Writing",
      "Report Writing",
      "Scientific Documentation",
      "Other",
    ],
  },

  Other: {
    "Custom Category": [
      "Other",
    ],
  },
};

const softSkillOptions = [
  "Communication",
  "Teamwork and Collaboration",
  "Leadership",
  "Time Management",
  "Problem Solving",
  "Quick Learner",
  "Adaptability",
  "Resilience",
  "Other",
]; 

const emptyProject = {
  title: "",
  description: "",
  techStack: [],
  repoLink: "",
  liveLink: "",
};

const emptyCertification = {
  name: "",
  organization: "",
  year: "",
  credentialUrl: "",
};

const emptyLanguage = {
  name: "",
  proficiency: "Intermediate",
};

/* =========================================================
   EMPTY RESUME
========================================================= */

const getEmptyResume = () => ({
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
    profileImage: "",
  },

  summary: "",

  education: [],

  experience: [],

  skills: [],
  strengths: [],

  projects: [],

  certifications: [],

  languages: [],

  socialLinks: {
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  },

  templateId: "professional",
});

/* =========================================================
   COMPONENT
========================================================= */

const ResumeBuilder = () => {
    const profileImageInputRef = useRef(null);
  const [resume, setResume] = useState(getEmptyResume());

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");

  const [username, setUsername] = useState("");

  const [copied, setCopied] = useState(false);

  /* =======================================================
     PUBLIC RESUME URL
  ======================================================= */

  const publicResumeUrl = username
    ? `${window.location.origin}/resume/${username}`
    : "";

  /* =======================================================
     GET USERNAME
  ======================================================= */

  

  /* =======================================================
     FETCH RESUME
  ======================================================= */

  const fetchResume = async () => {
  try {
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    // ==========================================
    // FETCH CURRENT USER + RESUME
    // ==========================================

    const response = await fetch(
      `${API_URL}/api/resume`,
      {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          "Failed to load resume"
      );
    }

    // ==========================================
    // IMPORTANT:
    // GET USERNAME FROM BACKEND
    // ==========================================

    if (data.user?.username) {
      setUsername(data.user.username);
    }

    // ==========================================
    // LOAD RESUME
    // ==========================================

    if (data.resume) {
      const serverResume = data.resume;

      setResume({
        personalInfo: {
          fullName:
            serverResume.personalInfo
              ?.fullName || "",

          email:
            serverResume.personalInfo
              ?.email || "",

          phone:
            serverResume.personalInfo
              ?.phone || "",

          location:
            serverResume.personalInfo
              ?.location || "",

          profession:
            serverResume.personalInfo
              ?.profession || "",

          profileImage:
            serverResume.personalInfo
              ?.profileImage || "",
        },

        summary:
          serverResume.summary || "",

        education:
          Array.isArray(
            serverResume.education
          )
            ? serverResume.education
            : [],

        experience:
          Array.isArray(
            serverResume.experience
          )
            ? serverResume.experience
            : [],

        skills:
          Array.isArray(
            serverResume.skills
          )
            ? serverResume.skills
            : [],

        strengths:
          Array.isArray(
            serverResume.strengths
          )
            ? serverResume.strengths
            : [],

        projects:
          Array.isArray(
            serverResume.projects
          )
            ? serverResume.projects
            : [],

        certifications:
          Array.isArray(
            serverResume.certifications
          )
            ? serverResume.certifications
            : [],

        languages:
          Array.isArray(
            serverResume.languages
          )
            ? serverResume.languages
            : [],

        socialLinks: {
          github:
            serverResume.socialLinks
              ?.github || "",

          linkedin:
            serverResume.socialLinks
              ?.linkedin || "",

          twitter:
            serverResume.socialLinks
              ?.twitter || "",

          website:
            serverResume.socialLinks
              ?.website || "",
        },

        templateId:
          serverResume.templateId ||
          "professional",
      });
    }

  } catch (error) {
    console.error(
      "Resume Fetch Error:",
      error
    );

    setMessage(
      error.message ||
        "Failed to load resume"
    );
  } finally {
    setLoading(false);
  }
};

  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {
    fetchResume();
  }, []);

  /* =======================================================
     PERSONAL INFO
  ======================================================= */

  const handlePersonalChange = (event) => {
    const { name, value } = event.target;

    setResume((previous) => ({
      ...previous,

      personalInfo: {
        ...previous.personalInfo,

        [name]: value,
      },
    }));
  };

  /* =======================================================
     PROFILE IMAGE
  ======================================================= */

  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image.");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setResume((previous) => ({
        ...previous,

        personalInfo: {
          ...previous.personalInfo,

          profileImage: reader.result,
        },
      }));
    };

    reader.readAsDataURL(file);
  };

const handleRemoveProfileImage = () => {
  setResume((previous) => ({
    ...previous,
    personalInfo: {
      ...previous.personalInfo,
      profileImage: "",
    },
  }));

  // File input bhi completely reset
  if (profileImageInputRef.current) {
    profileImageInputRef.current.value = "";
  }

  setMessage("Profile image removed.");
};
  /* =======================================================
     SUMMARY
  ======================================================= */

  const handleSummaryChange = (event) => {
    setResume((previous) => ({
      ...previous,

      summary: event.target.value,
    }));
  };

  /* =======================================================
     SOCIAL LINKS
  ======================================================= */

  const handleSocialChange = (event) => {
    const { name, value } = event.target;

    setResume((previous) => ({
      ...previous,

      socialLinks: {
        ...previous.socialLinks,

        [name]: value,
      },
    }));
  };

  /* =======================================================
     EDUCATION
  ======================================================= */

  const addEducation = () => {
    setResume((previous) => ({
      ...previous,

      education: [
        ...previous.education,

        {
          ...emptyEducation,
        },
      ],
    }));
  };

  const updateEducation = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const education = [
        ...previous.education,
      ];

      education[index] = {
        ...education[index],

        [field]: value,
      };

      return {
        ...previous,

        education,
      };
    });
  };

  const removeEducation = (index) => {
    setResume((previous) => ({
      ...previous,

      education: previous.education.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }));
  };

  /* =======================================================
     EXPERIENCE
  ======================================================= */

  const addExperience = () => {
    setResume((previous) => ({
      ...previous,

      experience: [
        ...previous.experience,

        {
          ...emptyExperience,
        },
      ],
    }));
  };

  const updateExperience = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const experience = [
        ...previous.experience,
      ];

      experience[index] = {
        ...experience[index],

        [field]: value,
      };

      return {
        ...previous,

        experience,
      };
    });
  };

const updateExperienceResponsibilities = (
  index,
  value
) => {
  setResume((previous) => {
    const experience = [
      ...previous.experience,
    ];

    experience[index] = {
      ...experience[index],

      responsibilities: value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    return {
      ...previous,
      experience,
    };
  });
};

  const removeExperience = (index) => {
    setResume((previous) => ({
      ...previous,

      experience:
        previous.experience.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /* =======================================================
     SKILLS
  ======================================================= */

  const addSkill = () => {
    setResume((previous) => ({
      ...previous,

      skills: [
        ...previous.skills,

        {
          ...emptySkill,
        },
      ],
    }));
  };

 const updateSkill = (index, field, value) => {
  setResume((previous) => {
    const skills = [...previous.skills];

    skills[index] = {
      ...skills[index],
      [field]: value,
    };

    return {
      ...previous,
      skills,
    };
  });
};
  const removeSkill = (index) => {
    setResume((previous) => ({
      ...previous,

      skills: previous.skills.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }));
  };
const addStrength = () => {
  setResume((previous) => ({
    ...previous,

    strengths: [
      ...previous.strengths,
      "",
    ],
  }));
};

const updateStrength = (
  index,
  value
) => {
  setResume((previous) => {
    const strengths = [
      ...previous.strengths,
    ];

    strengths[index] = value;

    return {
      ...previous,
      strengths,
    };
  });
};

const removeStrength = (index) => {
  setResume((previous) => ({
    ...previous,

    strengths:
      previous.strengths.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
  }));
};
  /* =======================================================
     PROJECTS
  ======================================================= */

  const addProject = () => {
    setResume((previous) => ({
      ...previous,

      projects: [
        ...previous.projects,

        {
          ...emptyProject,
        },
      ],
    }));
  };

  const updateProject = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const projects = [
        ...previous.projects,
      ];

      if (field === "techStack") {
        projects[index] = {
          ...projects[index],

          techStack: value
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        };
      } else {
        projects[index] = {
          ...projects[index],

          [field]: value,
        };
      }

      return {
        ...previous,

        projects,
      };
    });
  };

  const removeProject = (index) => {
    setResume((previous) => ({
      ...previous,

      projects:
        previous.projects.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /* =======================================================
     CERTIFICATIONS
  ======================================================= */

  const addCertification = () => {
    setResume((previous) => ({
      ...previous,

      certifications: [
        ...previous.certifications,

        {
          ...emptyCertification,
        },
      ],
    }));
  };

  const updateCertification = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const certifications = [
        ...previous.certifications,
      ];

      certifications[index] = {
        ...certifications[index],

        [field]: value,
      };

      return {
        ...previous,

        certifications,
      };
    });
  };

  const removeCertification = (index) => {
    setResume((previous) => ({
      ...previous,

      certifications:
        previous.certifications.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /* =======================================================
     LANGUAGES
  ======================================================= */

  const addLanguage = () => {
    setResume((previous) => ({
      ...previous,

      languages: [
        ...previous.languages,

        {
          ...emptyLanguage,
        },
      ],
    }));
  };

  const updateLanguage = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const languages = [
        ...previous.languages,
      ];

      languages[index] = {
        ...languages[index],

        [field]: value,
      };

      return {
        ...previous,

        languages,
      };
    });
  };

  const removeLanguage = (index) => {
    setResume((previous) => ({
      ...previous,

      languages:
        previous.languages.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));
  };

  /* =======================================================
     TEMPLATE
  ======================================================= */

  const handleTemplateChange = (event) => {
    setResume((previous) => ({
      ...previous,

      templateId: event.target.value,
    }));
  };

  /* =======================================================
     SAVE RESUME
  ======================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);

      setMessage("");

      const token = localStorage.getItem(
        "token"
      );

      if (!token) {
        window.location.href = "/login";

        return;
      }

      const response = await fetch(
        `${API_URL}/api/resume`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify(resume),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save resume"
        );
      }

      if (data.resume) {
        setResume((previous) => ({
          ...previous,

          ...data.resume,

          personalInfo: {
            ...previous.personalInfo,

            ...data.resume.personalInfo,
          },

          socialLinks: {
            ...previous.socialLinks,

            ...data.resume.socialLinks,
          },
        }));
      }

     // IMPORTANT: username backend se lo
if (data.user?.username) {
  setUsername(data.user.username);
}

setMessage(
  "Resume saved successfully ✅"
);

      window.scrollTo({
        top: 0,

        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Resume Save Error:",
        error
      );

      setMessage(
        error.message ||
          "Failed to save resume"
      );
    } finally {
      setSaving(false);
    }
  };

  /* =======================================================
     COPY PUBLIC LINK
  ======================================================= */

  const handleCopyLink = async () => {
    if (!publicResumeUrl) {
      setMessage(
        "Username not found. Please login again."
      );

      return;
    }

    try {
      await navigator.clipboard.writeText(
        publicResumeUrl
      );

      setCopied(true);

      setMessage(
        "Public resume link copied ✅"
      );

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Copy Link Error:",
        error
      );

      setMessage(
        "Unable to copy link. Please copy it manually."
      );
    }
  };

  /* =======================================================
     VIEW PUBLIC RESUME
  ======================================================= */

  const handleViewPublicResume = () => {
    if (!publicResumeUrl) {
      setMessage(
        "Username not found."
      );

      return;
    }

    window.open(
      publicResumeUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* =======================================================
     DOWNLOAD PDF
  ======================================================= */

  /* =======================================================
   DOWNLOAD PDF
======================================================= */

const handleDownloadPDF = async () => {
    try {
      setMessage("Generating PDF...");

      const resumeElement =
        document.querySelector(".resume-preview-wrapper") ||
        document.querySelector(".resume-preview") ||
        document.querySelector(".professional-template");

      if (!resumeElement) {
        console.error("Resume preview element not found.");
        setMessage("Resume preview not found.");
        return;
      }

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });

      const options = {
        margin: [15, 0, 15, 0],

        filename: `${username || "my-resume"}-resume.pdf`,

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: "#ffffff",
          logging: false,
          scrollX: 0,
          scrollY: 0,

          windowWidth: resumeElement.scrollWidth,
          windowHeight: resumeElement.scrollHeight,

          onclone: (clonedDocument) => {
            // ==========================================
            // PREVENT TEXT / ITEM SPLITTING
            // ==========================================

            const pageBreakStyle =
              clonedDocument.createElement("style");

            pageBreakStyle.setAttribute(
              "data-pdf-page-break-fix",
              "true"
            );

            pageBreakStyle.textContent = `
              .professional-description,
              .professional-responsibilities li,
              .professional-education-item,
              .professional-experience-item,
              .professional-project,
              .professional-certification-item {
                break-inside: avoid !important;
                page-break-inside: avoid !important;
              }

              .professional-section h3,
              .professional-item-header {
                break-after: avoid !important;
                page-break-after: avoid !important;
              }
            `;

            clonedDocument.head.appendChild(pageBreakStyle);

            // ==========================================
            // MODERN TEMPLATE SIDEBAR
            // ==========================================

            const clonedLayout =
              clonedDocument.querySelector(".modern-layout");

            const clonedSidebar =
              clonedDocument.querySelector(".modern-sidebar");

            if (clonedLayout && clonedSidebar) {
              const sidebarWidth =
                clonedSidebar.getBoundingClientRect().width;

              const contentHeight = Math.max(
                clonedLayout.scrollHeight,
                clonedLayout.getBoundingClientRect().height
              );

              const mmToPx = 96 / 25.4;
              const a4HeightPx = 297 * mmToPx;

              const totalRequiredPages = Math.max(
                1,
                Math.ceil(contentHeight / a4HeightPx)
              );

              const fullHeight = Math.max(
                contentHeight,
                totalRequiredPages * a4HeightPx
              );

              clonedLayout.style.position = "relative";
              clonedLayout.style.minHeight =
                `${fullHeight}px`;
              clonedLayout.style.height =
                `${fullHeight}px`;

              const oldBackground =
                clonedLayout.querySelector(
                  ".pdf-sidebar-background"
                );

              if (oldBackground) {
                oldBackground.remove();
              }

              const sidebarBackground =
                clonedDocument.createElement("div");

              sidebarBackground.className =
                "pdf-sidebar-background";

              sidebarBackground.style.position =
                "absolute";

              sidebarBackground.style.left = "0";
              sidebarBackground.style.top = "0";

              sidebarBackground.style.width =
                `${sidebarWidth}px`;

              sidebarBackground.style.height =
                `${fullHeight}px`;

              sidebarBackground.style.background =
                "#222b36";

              sidebarBackground.style.zIndex = "0";
              sidebarBackground.style.pointerEvents =
                "none";

              clonedLayout.insertBefore(
                sidebarBackground,
                clonedLayout.firstChild
              );

              clonedSidebar.style.position =
                "relative";

              clonedSidebar.style.zIndex = "2";
              clonedSidebar.style.background =
                "transparent";

              const clonedMain =
                clonedLayout.querySelector(
                  ".modern-main"
                );

              if (clonedMain) {
                clonedMain.style.position =
                  "relative";

                clonedMain.style.zIndex = "2";
              }
            }
          },
        },

        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },

        // CSS page breaks only.
        // Old "auto" selectors are intentionally removed.
        pagebreak: {
          mode: ["css"],
        },
      };

      // ==========================================
      // CREATE PDF
      // ==========================================

      const pdf = await html2pdf()
        .set(options)
        .from(resumeElement)
        .toPdf()
        .get("pdf");

      const totalPages =
        pdf.internal.getNumberOfPages();

      const pageWidth =
        pdf.internal.pageSize.getWidth();

      const pageHeight =
        pdf.internal.pageSize.getHeight();

      // ==========================================
      // HEADER + FOOTER
      // ==========================================

      // IMPORTANT:
      // No vertical divider is added here.
      // The old divider was creating the unwanted
      // vertical line through the Minimal template.

      const fullName =
        resume?.personalInfo?.fullName?.trim() ||
        username ||
        "My Resume";

      for (
        let page = 1;
        page <= totalPages;
        page++
      ) {
        pdf.setPage(page);

        const left = 10;
        const right = 10;

        const headerTextY = 8;
        const headerLineY = 12;

        const footerLineY =
          pageHeight - 12;

        const footerTextY =
          pageHeight - 6;

        // ------------------------------------------
        // HEADER
        // ------------------------------------------

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(8);

       

        pdf.setDrawColor(
          52,
          73,
          94
        );

        pdf.setLineWidth(0.4);

        pdf.line(
          left,
          headerLineY,
          pageWidth - right,
          headerLineY
        );

        // ------------------------------------------
        // FOOTER
        // ------------------------------------------

        pdf.setDrawColor(
          52,
          73,
          94
        );

        pdf.setLineWidth(0.4);

        pdf.line(
          left,
          footerLineY,
          pageWidth - right,
          footerLineY
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(7.5);

       

        pdf.text(
          `Page ${page} of ${totalPages}`,
          pageWidth - right,
          footerTextY,
          {
            align: "right",
          }
        );
      }

      // ==========================================
      // SAVE PDF
      // ==========================================

      pdf.save(
        `${username || "my-resume"}-resume.pdf`
      );

      setMessage(
        "PDF downloaded successfully ✅"
      );
    } catch (error) {
      console.error(
        "PDF Download Error:",
        error
      );

      setMessage(
        "PDF download failed. Please check browser console."
      );
    }
  };

  /* =======================================================
     PRINT
  ======================================================= */

  /* =======================================================
     PRINT RESUME
  ======================================================= */

const handlePrint = () => {
  const resumeElement =
    document.querySelector(".resume-preview-wrapper") ||
    document.querySelector(".resume-preview");

  if (!resumeElement) {
    setMessage("Resume preview not found.");
    return;
  }

  window.print();
};
  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="resume-loading">
        <div className="resume-loading-box">
          <div className="resume-loading-spinner" />

          <h2>
            Loading Resume Builder...
          </h2>

          <p>
            Please wait while your resume
            is being loaded.
          </p>
        </div>
      </div>
    );
  }

  /* =======================================================
     UI
  ======================================================= */

  return (
    <div className="resume-builder">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="resume-builder-header">

        <div>
          <h1>
            📄 Resume Builder
          </h1>

          <p>
            Create a professional resume
            with CodeFolio.
          </p>
        </div>

        <button
          type="button"
          className="resume-back-btn"
          onClick={() =>
            window.history.back()
          }
        >
          ← Back
        </button>

      </div>

      {/* ===================================================
          MESSAGE
      =================================================== */}

      {message && (
        <div className="resume-message">
          {message}
        </div>
      )}

      {/* ===================================================
          PERSONAL INFORMATION
      =================================================== */}

      <section className="resume-card">

        <div className="resume-section-title">
          <span>01</span>

          <div>
            <h2>
              Personal Information
            </h2>

            <p>
              Add your basic contact
              details.
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
                resume.personalInfo.fullName
              }
              onChange={
                handlePersonalChange
              }
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
                resume.personalInfo.profession
              }
              onChange={
                handlePersonalChange
              }
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
                resume.personalInfo.email
              }
              onChange={
                handlePersonalChange
              }
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
                resume.personalInfo.phone
              }
              onChange={
                handlePersonalChange
              }
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
                resume.personalInfo.location
              }
              onChange={
                handlePersonalChange
              }
              placeholder="City, State, Country"
            />
          </div>

         <div className="resume-field full-width">
  <label>Profile Image</label>

  <input
    ref={profileImageInputRef}
    type="file"
    accept="image/*"
    onChange={handleProfileImageChange}
  />

  {resume.personalInfo.profileImage && (
    <div className="resume-image-preview">

      <img
        src={resume.personalInfo.profileImage}
        alt="Profile Preview"
      />

      <button
        type="button"
        className="resume-remove-image-btn"
        onClick={handleRemoveProfileImage}
      >
        🗑️ Remove
      </button>

    </div>
  )}
</div>
        </div>

      </section>

      {/* ===================================================
          SUMMARY
      =================================================== */}

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
            value={resume.summary}
            onChange={
              handleSummaryChange
            }
            placeholder="Write your professional summary..."
          />

        </div>

      </section>

      {/* ===================================================
          EDUCATION
      =================================================== */}

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

        {resume.education.map(
          (education, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Education #
                  {index + 1}
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
                    Degree /
                    Qualification
                  </label>

                  <input
                    type="text"
                    value={
                      education.degree
                    }
                    onChange={(event) =>
                      updateEducation(
                        index,
                        "degree",
                        event.target.value
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
                      education.institution
                    }
                    onChange={(event) =>
                      updateEducation(
                        index,
                        "institution",
                        event.target.value
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
                      education.year
                    }
                    onChange={(event) =>
                      updateEducation(
                        index,
                        "year",
                        event.target.value
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
                      education.description
                    }
                    onChange={(event) =>
                      updateEducation(
                        index,
                        "description",
                        event.target.value
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

      {/* ===================================================
          EXPERIENCE
      =================================================== */}

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

        {resume.experience.map(
          (experience, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Experience #
                  {index + 1}
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
                      experience.jobTitle
                    }
                    onChange={(event) =>
                      updateExperience(
                        index,
                        "jobTitle",
                        event.target.value
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
                      experience.company
                    }
                    onChange={(event) =>
                      updateExperience(
                        index,
                        "company",
                        event.target.value
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
                      experience.startDate
                    }
                    onChange={(event) =>
                      updateExperience(
                        index,
                        "startDate",
                        event.target.value
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
                      experience.endDate
                    }
                    onChange={(event) =>
                      updateExperience(
                        index,
                        "endDate",
                        event.target.value
                      )
                    }
                    placeholder="Present"
                  />
                </div>

                
 
 <div className="resume-field full-width">

  <label>
    Responsibilities / Achievements
  </label>

  <textarea
    rows="6"
    value={
      experience.responsibilities?.join("\n") || ""
    }
    onChange={(event) =>
      updateExperienceResponsibilities(
        index,
        event.target.value
      )
    }
    placeholder={`Write one responsibility or achievement per line.

Example:
Developed responsive React applications.
Integrated REST APIs.
`}
  />

  <small className="resume-field-help">
    Write each responsibility or achievement on a new line.
  </small>

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

      {/* ===================================================
          SKILLS
      =================================================== */}
      <section className="resume-card">
        <div className="resume-section-title">
          <span>05</span>
          <div>
            <h2>Skills</h2>
            <p>Add technical and soft skills to your resume.</p>
          </div>
        </div>

        {/* TECHNICAL SKILLS */}
        <div className="skills-subsection">
          <div className="skills-subsection-header">
            <div>
              <h3>1. Technical Skills</h3>
            
            </div>
          </div>

          {resume.skills
            .map((skill, index) => ({ skill, index }))
            .filter(({ skill }) => skill.type === "Technical")
            .map(({ skill, index }, filteredIndex) => {
              const domains = Object.keys(technicalSkillOptions);
              const expertiseOptions =
                technicalSkillOptions[skill.category] || {};
              const expertiseList = Object.keys(expertiseOptions);
              const skillOptions =
                expertiseOptions[skill.expertise] || [];

              const selectedSkills = Array.isArray(skill.name)
                ? skill.name
                : skill.name
                  ? [skill.name]
                  : [];

              const toggleSkill = (skillName) => {
                const current = Array.isArray(skill.name)
                  ? skill.name
                  : skill.name
                    ? [skill.name]
                    : [];

                const updated = current.includes(skillName)
                  ? current.filter((item) => item !== skillName)
                  : [...current, skillName];

                updateSkill(index, "name", updated);
              };

              return (
                <div className="resume-repeat-card skill-card" key={index}>
                  <div className="resume-repeat-header">
                    <h3>Technical Skill #{filteredIndex + 1}</h3>
                    <button
                      type="button"
                      className="resume-remove-btn"
                      onClick={() => removeSkill(index)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="resume-grid">
                    {/* DOMAIN */}
                    <div className="resume-field">
                      <label>Skill Domain</label>

                      <select
                        value={skill.category || ""}
                        onChange={(event) => {
                          const value = event.target.value;

                          updateSkill(index, "category", value);
                          updateSkill(index, "expertise", "");
                          updateSkill(index, "name", []);
                          updateSkill(index, "customCategory", "");
                          updateSkill(index, "customExpertise", "");
                          updateSkill(index, "customName", "");
                        }}
                      >
                        <option value="">Select Domain</option>

                        {domains.map((domain) => (
                          <option key={domain} value={domain}>
                            {domain}
                          </option>
                        ))}

                        <option value="Other">Other / Custom</option>
                      </select>
                    </div>

                    {skill.category === "Other" && (
                      <div className="resume-field">
                        <label>Custom Skill Domain</label>

                        <input
                          type="text"
                          value={skill.customCategory || ""}
                          onChange={(event) =>
                            updateSkill(
                              index,
                              "customCategory",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Artificial Intelligence"
                        />
                      </div>
                    )}

                    {/* EXPERTISE */}
                    <div className="resume-field">
                      <label>Technical / Expertise</label>

                      <select
                        value={skill.expertise || ""}
                        onChange={(event) => {
                          const value = event.target.value;

                          updateSkill(index, "expertise", value);
                          updateSkill(index, "name", []);
                          updateSkill(index, "customName", "");

                          if (value !== "Other") {
                            updateSkill(index, "customExpertise", "");
                          }
                        }}
                      >
                        <option value="">
                          Select Technical / Expertise
                        </option>

                        {skill.category &&
                          skill.category !== "Other" &&
                          expertiseList.map((expertise) => (
                            <option key={expertise} value={expertise}>
                              {expertise}
                            </option>
                          ))}

                        <option value="Other">Other / Custom</option>
                      </select>
                    </div>

                    {skill.expertise === "Other" && (
                      <div className="resume-field">
                        <label>Custom Technical / Expertise</label>

                        <input
                          type="text"
                          value={skill.customExpertise || ""}
                          onChange={(event) =>
                            updateSkill(
                              index,
                              "customExpertise",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Generative AI"
                        />
                      </div>
                    )}

                   {/* =====================================================
    SELECT SKILLS
===================================================== */}

<div className="resume-field full-width">
  <label>Select Skills</label>

  <div className="skill-checkbox-panel">

    {/* HEADER */}
    <div className="skill-checkbox-panel-header">
      <strong>Available Skills</strong>

      <span>
        {selectedSkills.filter(
          (item) => item !== "Other"
        ).length +
          (selectedSkills.includes("Other") ? 1 : 0)}{" "}
        selected
      </span>
    </div>

    {/* =================================================
        CUSTOM EXPERTISE
        If Technical / Expertise = Other
    ================================================= */}

    {skill.expertise === "Other" ? (
      <div className="skill-checkbox-grid">

        <label className="skill-checkbox-option">
          <span>Other / Custom</span>

          <input
            type="checkbox"
            checked={selectedSkills.includes("Other")}
            onChange={() => {
              const current = Array.isArray(skill.name)
                ? skill.name
                : [];

              const updated = current.includes("Other")
                ? current.filter(
                    (item) => item !== "Other"
                  )
                : [...current, "Other"];

              updateSkill(index, "name", updated);

              if (!updated.includes("Other")) {
                updateSkill(index, "customName", "");
              }
            }}
          />
        </label>

      </div>
    ) : skillOptions.length > 0 ? (

      /* =================================================
         NORMAL SKILLS
      ================================================= */

      <div className="skill-checkbox-grid">

        {skillOptions
          .filter((item) => item !== "Other")
          .map((item) => (
            <label
              className="skill-checkbox-option"
              key={item}
            >
              <span>{item}</span>

              <input
                type="checkbox"
                checked={selectedSkills.includes(item)}
                onChange={() => toggleSkill(item)}
              />
            </label>
          ))}

        {/* OTHER / CUSTOM */}
        <label className="skill-checkbox-option">
          <span>Other / Custom</span>

          <input
            type="checkbox"
            checked={selectedSkills.includes("Other")}
            onChange={() => toggleSkill("Other")}
          />
        </label>

      </div>

    ) : (

      /* =================================================
         EMPTY
      ================================================= */

      <div className="skill-empty-message">
        Select a domain and technical/expertise first.
      </div>

    )}

  </div>
</div>


{/* =====================================================
    CUSTOM SKILL
===================================================== */}

{selectedSkills.includes("Other") && (
  <div className="resume-field full-width">

    <label>Custom Skill</label>

    <input
      type="text"
      value={skill.customName || ""}
      onChange={(event) =>
        updateSkill(
          index,
          "customName",
          event.target.value
        )
      }
      placeholder="e.g. Generative AI"
    />

  </div>
)}
                    

                    {/* LEVEL */}
                    <div className="resume-field">
                      <label>Skill Level</label>

                      <select
                        value={skill.level || "Beginner"}
                        onChange={(event) =>
                          updateSkill(
                            index,
                            "level",
                            event.target.value
                          )
                        }
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}

          <button
            type="button"
            className="resume-add-btn"
            onClick={() =>
              setResume((previous) => ({
                ...previous,
                skills: [
                  ...previous.skills,
                  {
                    type: "Technical",
                    name: [],
                    customName: "",
                    category: "Information Technology (IT)",
                    customCategory: "",
                    expertise: "Programming Languages",
                    customExpertise: "",
                    level: "Beginner",
                  },
                ],
              }))
            }
          >
            + Add Technical Skill Group
          </button>
        </div>

        {/* SOFT SKILLS */}
        <div className="skills-subsection soft-skills-section">
          <div className="skills-subsection-header">
            <div>
              <h3>2. Soft Skills</h3>
              
            </div>
          </div>

          {resume.skills
            .map((skill, index) => ({ skill, index }))
            .filter(({ skill }) => skill.type === "Soft")
            .map(({ skill, index }, filteredIndex) => {
              const selectedSkills = Array.isArray(skill.name)
                ? skill.name
                : skill.name
                  ? [skill.name]
                  : [];

              const toggleSoftSkill = (skillName) => {
                const current = Array.isArray(skill.name)
                  ? skill.name
                  : skill.name
                    ? [skill.name]
                    : [];

                const updated = current.includes(skillName)
                  ? current.filter((item) => item !== skillName)
                  : [...current, skillName];

                updateSkill(index, "name", updated);
              };

              return (
                <div className="resume-repeat-card skill-card" key={index}>
                  <div className="resume-repeat-header">
                    <h3>Soft Skill Group #{filteredIndex + 1}</h3>

                    <button
                      type="button"
                      className="resume-remove-btn"
                      onClick={() => removeSkill(index)}
                    >
                      Remove
                    </button>
                  </div>

                  <div className="resume-grid">
                    <div className="resume-field full-width">
                      <label>Select Soft Skills</label>

                      <div className="soft-skill-selection">
                        <div className="soft-skill-selection-header">
                          <strong>Available Soft Skills</strong>
                          <span>
                            {selectedSkills.filter(
                              (item) => item !== "Other"
                            ).length} selected
                          </span>
                        </div>

                        <div className="soft-skill-options">
                          {softSkillOptions
                            .filter((item) => item !== "Other")
                            .map((item) => (
                              <label
                                className="soft-skill-option"
                                key={item}
                              >
                                <span className="soft-skill-name">
                                  {item}
                                </span>

                                <input
                                  type="checkbox"
                                  checked={selectedSkills.includes(item)}
                                  onChange={() => toggleSoftSkill(item)}
                                />
                              </label>
                            ))}

                          <label className="soft-skill-option">
                            <span className="soft-skill-name">
                              Other / Custom
                            </span>

                            <input
                              type="checkbox"
                              checked={selectedSkills.includes("Other")}
                              onChange={() => toggleSoftSkill("Other")}
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    {selectedSkills.includes("Other") && (
                      <div className="resume-field full-width">
                        <label>Custom Soft Skill</label>

                        <input
                          type="text"
                          value={skill.customName || ""}
                          onChange={(event) =>
                            updateSkill(
                              index,
                              "customName",
                              event.target.value
                            )
                          }
                          placeholder="e.g. Creativity, Critical Thinking"
                        />
                      </div>
                    )}

                    
                  </div>
                </div>
              );
            })}

          <button
            type="button"
            className="resume-add-btn"
            onClick={() =>
              setResume((previous) => ({
                ...previous,
                skills: [
                  ...previous.skills,
                  {
                    type: "Soft",
                    name: [],
                    customName: "",
                    category: "Soft Skills",
                    customCategory: "",
                    expertise: "",
                    customExpertise: "",
                    
                  },
                ],
              }))
            }
          >
            + Add Soft Skill Group
          </button>
        </div>
      </section>

      {/* ===================================================
    STRENGTHS
=================================================== */}

<section className="resume-card">

  <div className="resume-section-title">

    <span>06</span>

    <div>
      <h2>
        Strengths
      </h2>

      <p>
        Highlight your professional strengths.
      </p>
    </div>

  </div>

  {resume.strengths.map(
    (strength, index) => (

      <div
        className="resume-strength-row"
        key={index}
      >

        <div className="resume-field">

          <label>
            Strength #{index + 1}
          </label>

          <input
            type="text"
            value={strength}
            onChange={(event) =>
              updateStrength(
                index,
                event.target.value
              )
            }
            placeholder="e.g. Hardworking"
          />

        </div>

        <button
          type="button"
          className="resume-remove-btn"
          onClick={() =>
            removeStrength(index)
          }
        >
          Remove
        </button>

      </div>

    )
  )}

  <button
    type="button"
    className="resume-add-btn"
    onClick={addStrength}
  >
    + Add Strength
  </button>

</section>

      {/* ===================================================
          PROJECTS
      =================================================== */}

      <section className="resume-card">

        <div className="resume-section-title">
          <span>07</span>

          <div>
            <h2>
              Projects
            </h2>

            <p>
              Add your important projects.
            </p>
          </div>
        </div>

        {resume.projects.map(
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
                      project.title
                    }
                    onChange={(event) =>
                      updateProject(
                        index,
                        "title",
                        event.target.value
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
                    onChange={(event) =>
                      updateProject(
                        index,
                        "techStack",
                        event.target.value
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
                      project.repoLink
                    }
                    onChange={(event) =>
                      updateProject(
                        index,
                        "repoLink",
                        event.target.value
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
                      project.liveLink
                    }
                    onChange={(event) =>
                      updateProject(
                        index,
                        "liveLink",
                        event.target.value
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
                      project.description
                    }
                    onChange={(event) =>
                      updateProject(
                        index,
                        "description",
                        event.target.value
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

      {/* ===================================================
          CERTIFICATIONS
      =================================================== */}

      <section className="resume-card">

        <div className="resume-section-title">
          <span>08</span>

          <div>
            <h2>
              Certifications & Training
            </h2>

            <p>
              Add certificates,
              courses and training.
            </p>
          </div>
        </div>

        {resume.certifications.map(
          (certification, index) => (
            <div
              className="resume-repeat-card"
              key={index}
            >

              <div className="resume-repeat-header">

                <h3>
                  Certification #
                  {index + 1}
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
                    Certificate Name
                  </label>

                  <input
                    type="text"
                    value={
                      certification.name
                    }
                    onChange={(event) =>
                      updateCertification(
                        index,
                        "name",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Full Stack Web Development"
                  />
                </div>

                <div className="resume-field">
                  <label>
                    Organization
                  </label>

                  <input
                    type="text"
                    value={
                      certification.organization
                    }
                    onChange={(event) =>
                      updateCertification(
                        index,
                        "organization",
                        event.target.value
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
                    value={
                      certification.year
                    }
                    onChange={(event) =>
                      updateCertification(
                        index,
                        "year",
                        event.target.value
                      )
                    }
                    placeholder="2026"
                  />
                </div>

                <div className="resume-field">
                  <label>
                    Credential URL
                  </label>

                  <input
                    type="url"
                    value={
                      certification.credentialUrl
                    }
                    onChange={(event) =>
                      updateCertification(
                        index,
                        "credentialUrl",
                        event.target.value
                      )
                    }
                    placeholder="https://..."
                  />
                </div>

              </div>

            </div>
          )
        )}

        <button
          type="button"
          className="resume-add-btn"
          onClick={addCertification}
        >
          + Add Certification
        </button>

      </section>

      {/* ===================================================
          LANGUAGES
      =================================================== */}

      <section className="resume-card">

        <div className="resume-section-title">
          <span>09</span>

          <div>
            <h2>
              Languages
            </h2>

            <p>
              Add languages you know.
            </p>
          </div>
        </div>

        {resume.languages.map(
          (language, index) => (
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
                    value={
                      language.name
                    }
                    onChange={(event) =>
                      updateLanguage(
                        index,
                        "name",
                        event.target.value
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
                    value={
                      language.proficiency ||
                      "Intermediate"
                    }
                    onChange={(event) =>
                      updateLanguage(
                        index,
                        "proficiency",
                        event.target.value
                      )
                    }
                  >
                    <option value="Basic">
                      Basic
                    </option>

                    <option value="Intermediate">
                      Intermediate
                    </option>

                    <option value="Advanced">
                      Advanced
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
          className="resume-add-btn"
          onClick={addLanguage}
        >
          + Add Language
        </button>

      </section>

      {/* ===================================================
          SOCIAL LINKS
      =================================================== */}

      <section className="resume-card">

        <div className="resume-section-title">
          <span>10</span>

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
                resume.socialLinks.github
              }
              onChange={
                handleSocialChange
              }
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
                resume.socialLinks.linkedin
              }
              onChange={
                handleSocialChange
              }
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
                resume.socialLinks.twitter
              }
              onChange={
                handleSocialChange
              }
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
                resume.socialLinks.website
              }
              onChange={
                handleSocialChange
              }
              placeholder="https://yourwebsite.com"
            />
          </div>

        </div>

      </section>

      {/* ===================================================
          TEMPLATE
      =================================================== */}
{/* =====================================================
    RESUME TEMPLATE SELECTOR
===================================================== */}

<div className="resume-template-selector">
  <h3>Choose Resume Template</h3>

  <div className="resume-template-options">

    <button
      type="button"
      className={
        resume.templateId === "professional"
          ? "template-option active"
          : "template-option"
      }
      onClick={() =>
        setResume((prev) => ({
          ...prev,
          templateId: "professional",
        }))
      }
    >
      <div className="template-preview-box professional-preview">
        <div className="template-preview-header"></div>
        <div className="template-preview-lines"></div>
        <div className="template-preview-lines"></div>
        <div className="template-preview-lines"></div>
      </div>

      <strong>Professional</strong>
      <span>Clean & ATS Friendly</span>
    </button>


    <button
      type="button"
      className={
        resume.templateId === "modern"
          ? "template-option active"
          : "template-option"
      }
      onClick={() =>
        setResume((prev) => ({
          ...prev,
          templateId: "modern",
        }))
      }
    >
      <div className="template-preview-box modern-preview">
        <div className="template-preview-sidebar"></div>
        <div className="template-preview-lines"></div>
        <div className="template-preview-lines"></div>
      </div>

      <strong>Modern</strong>
      <span>Modern Layout</span>
    </button>


    <button
      type="button"
      className={
        resume.templateId === "minimal"
          ? "template-option active"
          : "template-option"
      }
      onClick={() =>
        setResume((prev) => ({
          ...prev,
          templateId: "minimal",
        }))
      }
    >
      <div className="template-preview-box minimal-preview">
        <div className="template-preview-header"></div>
        <div className="template-preview-lines"></div>
        <div className="template-preview-lines"></div>
      </div>

      <strong>Minimal</strong>
      <span>Simple & Clean</span>
    </button>


    <button
      type="button"
      className={
        resume.templateId === "developer"
          ? "template-option active"
          : "template-option"
      }
      onClick={() =>
        setResume((prev) => ({
          ...prev,
          templateId: "developer",
        }))
      }
    >
      <div className="template-preview-box developer-preview">
        <div className="template-preview-header"></div>
        <div className="template-preview-lines"></div>
        <div className="template-preview-lines"></div>
      </div>

      <strong>Developer</strong>
      <span>Developer Focused</span>
    </button>

  </div>
</div>
      {/* ===================================================
          SAVE
      =================================================== */}

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

      {/* ===================================================
          PUBLIC RESUME LINK
      =================================================== */}

      {username && (
        <section className="resume-card resume-share-card">

          <div className="resume-section-title">
            <span>11</span>

            <div>
              <h2>
                Public Resume
              </h2>

              <p>
                Share your resume with
                recruiters and companies.
              </p>
            </div>
          </div>

          <div className="resume-share-box">

            <label>
              Your Public Resume Link
            </label>

            <div className="resume-share-row">

              <input
                type="text"
                value={publicResumeUrl}
                readOnly
              />

              <button
                type="button"
                className="resume-copy-btn"
                onClick={
                  handleCopyLink
                }
              >
                {copied
                  ? "Copied ✓"
                  : "📋 Copy"}
              </button>

            </div>

            <div className="resume-share-actions">

              <button
                type="button"
                className="resume-view-btn"
                onClick={
                  handleViewPublicResume
                }
              >
                👁 View Public Resume
              </button>

             

            </div>

          </div>

        </section>
      )}

      {/* ===================================================
          LIVE PREVIEW
      =================================================== */}

      <section className="resume-preview-card">

        <div className="resume-section-title">
          <span>12</span>

          <div>
            <h2>
              Live Resume Preview
            </h2>

            <p>
              Your resume updates
              automatically while you type.
            </p>
          </div>
        </div>

        <div className="resume-actions">

          <button
            type="button"
            className="resume-download-btn"
            onClick={handleDownloadPDF}
          >
            📥 Download PDF
          </button>

          <button
            type="button"
            className="resume-print-btn"
            onClick={handlePrint}
          >
            🖨️ Print Resume
          </button>

        </div>

        <ResumePreview
          resume={resume}
        />

      </section>

    </div>
  );
};

export default ResumeBuilder;