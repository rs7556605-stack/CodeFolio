import React from "react";

import ProfessionalTemplate from "./resumeTemplates/ProfessionalTemplate";
import ModernTemplate from "./resumeTemplates/ModernTemplate";
import MinimalTemplate from "./resumeTemplates/MinimalTemplate";
import DeveloperTemplate from "./resumeTemplates/DeveloperTemplate";

import "./ResumePreview.css";

const templates = {
  professional: ProfessionalTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  minimalist: MinimalTemplate,
  developer: DeveloperTemplate,
};

const ResumePreview = ({ resume }) => {
  const templateId =
    resume?.templateId || "professional";

  const SelectedTemplate =
    templates[templateId] || ProfessionalTemplate;

  return (
    <div className="resume-preview-wrapper">
      <SelectedTemplate resume={resume} />
    </div>
  );
};

export default ResumePreview;