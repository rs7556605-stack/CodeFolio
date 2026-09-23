import React from "react";
import Cyberpunk from "../templates/Cyberpunk/Cyberpunk";


const TemplateTest = () => {
  const demoData = {
    username: "rupak",
    name: "Rupak Singh",
    bio: "Full Stack Developer passionate about building modern web applications.",

    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",

    resumeUrl: "https://example.com/resume.pdf",

    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },

    skills: [
      {
        _id: "1",
        name: "HTML",
      },
      {
        _id: "2",
        name: "CSS",
      },
      {
        _id: "3",
        name: "JavaScript",
      },
      {
        _id: "4",
        name: "React",
      },
      {
        _id: "5",
        name: "Node.js",
      },
      {
        _id: "6",
        name: "MongoDB",
      },
    ],

    projects: [
      {
        _id: "1",
        title: "CodeFolio",
        description:
          "A dynamic portfolio CMS for developers.",
        techStack: [
          "React",
          "Node.js",
          "MongoDB",
        ],
        repoLink: "https://github.com",
        liveLink: "https://example.com",
        screenshot:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      },

      {
        _id: "2",
        title: "AI Creator",
        description:
          "An AI-powered content creation application.",
        techStack: [
          "React",
          "Express",
          "MongoDB",
        ],
        repoLink: "https://github.com",
        liveLink: "https://example.com",
        screenshot:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      },
    ],
  };

  return <Cyberpunk data={demoData} />;
};

export default TemplateTest;