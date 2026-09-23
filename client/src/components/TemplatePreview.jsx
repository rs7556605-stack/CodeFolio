import React from "react";

import Minimalist from "../templates/Minimalist/Minimalist";
import Cyberpunk from "../templates/Cyberpunk/Cyberpunk";
import Nexus from "../templates/Nexus/Nexus";
import Corporate from "../templates/Corporate/Corporate";
import Glassmorphism from "../templates/Glassmorphism/Glassmorphism";

const TemplatePreview = ({
  templateId,
  user,
  skills,
  projects,
}) => {
  const data = {
    ...user,
    skills,
    projects,
  };

  if (templateId === "cyberpunk") {
    return <Cyberpunk data={data} />;
  }

  if (templateId === "nexus") {
    return <Nexus data={data} />;
  }

  if (templateId === "corporate") {
    return <Corporate data={data} />;
  }

  if (templateId === "glassmorphism") {
    return <Glassmorphism data={data} />;
  }

  return <Minimalist data={data} />;
};

export default TemplatePreview;