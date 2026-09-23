import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import templateMap from "../templates/templateMap";
import { Helmet } from "react-helmet-async";

const PublicPortfolio = () => {
  const { username } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // FETCH PUBLIC PORTFOLIO
  // ==========================================
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/public/${username}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Portfolio not found"
          );
        }

        console.log("PUBLIC PORTFOLIO DATA:", data);

        setPortfolio(data);
      } catch (error) {
        console.error(
          "Public Portfolio Error:",
          error
        );

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [username]);

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="public-portfolio">
        <h2>Loading Portfolio...</h2>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================
  if (error) {
    return (
      <div className="public-portfolio">

        <Helmet>
          <title>
            Portfolio Not Found | CodeFolio
          </title>

          <meta
            name="description"
            content="The requested CodeFolio portfolio could not be found."
          />

          <meta
            name="robots"
            content="noindex, nofollow"
          />
        </Helmet>

        <h2>Portfolio Not Found</h2>

        <p>{error}</p>

      </div>
    );
  }

  // ==========================================
  // PORTFOLIO DATA
  // ==========================================
  const { user, projects, skills } = portfolio;

  // ==========================================
  // DYNAMIC SEO DATA
  // ==========================================

  const portfolioName =
    user.name || user.username;

  const portfolioProfession =
    user.profession || "Developer";

  const portfolioBio =
    user.bio ||
    `View ${portfolioName}'s ${portfolioProfession} portfolio on CodeFolio.`;

  // ==========================================
  // DYNAMIC PAGE TITLE
  // ==========================================

  const pageTitle =
    `${portfolioName} | ${portfolioProfession}`;

  // ==========================================
  // PUBLIC PORTFOLIO URL
  // ==========================================

  const portfolioUrl =
    `${window.location.origin}/${user.username}`;

  // ==========================================
  // JSON-LD STRUCTURED DATA
  // ==========================================

  const structuredData = {
    "@context": "https://schema.org",

    "@type": "Person",

    name: portfolioName,

    jobTitle: portfolioProfession,

    url: portfolioUrl,

    description: portfolioBio,

    ...(user.profileImage && {
      image: user.profileImage,
    }),

    ...(user.socialLinks && {
      sameAs: [
        user.socialLinks.github,
        user.socialLinks.linkedin,
        user.socialLinks.twitter,
        user.socialLinks.website,
      ].filter(Boolean),
    }),
  };

  // ==========================================
  // SELECTED TEMPLATE
  // ==========================================

  const SelectedTemplate =
    templateMap[user.templateId] ||
    templateMap.minimalist;

  // ==========================================
  // TEMPLATE DATA
  // ==========================================

  const templateData = {
    username: user.username,

    name: user.name,

    profession: user.profession || "",

    bio: user.bio,

    profileImage: user.profileImage,

    resumeUrl: user.resumeUrl,

    socialLinks: user.socialLinks,

    skills: skills,

    projects: projects,
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      {/* ======================================
          SEO
      ====================================== */}

      <Helmet>

        {/* Page Title */}
        <title>
          {pageTitle}
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content={portfolioBio}
        />

        {/* Keywords */}
        <meta
          name="keywords"
          content={`${portfolioName}, ${portfolioProfession}, developer, portfolio, CodeFolio, ${user.username}`}
        />

        {/* Author */}
        <meta
          name="author"
          content={portfolioName}
        />

        {/* Robots */}
        <meta
          name="robots"
          content="index, follow"
        />

        {/* ==================================
            CANONICAL
        ================================== */}

        <link
          rel="canonical"
          href={portfolioUrl}
        />

        {/* ==================================
            OPEN GRAPH
        ================================== */}

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={portfolioBio}
        />

        <meta
          property="og:type"
          content="profile"
        />

        <meta
          property="og:url"
          content={portfolioUrl}
        />

        <meta
          property="og:site_name"
          content="CodeFolio"
        />

        {user.profileImage && (
          <meta
            property="og:image"
            content={user.profileImage}
          />
        )}

        {/* ==================================
            TWITTER CARD
        ================================== */}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={portfolioBio}
        />

        {user.profileImage && (
          <meta
            name="twitter:image"
            content={user.profileImage}
          />
        )}

        {/* ==================================
            JSON-LD
        ================================== */}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

      </Helmet>

      {/* ======================================
          PORTFOLIO TEMPLATE
      ====================================== */}

      <SelectedTemplate
        data={templateData}
      />

    </>
  );
};

export default PublicPortfolio;