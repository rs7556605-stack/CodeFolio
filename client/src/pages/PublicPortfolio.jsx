import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import templateMap from "../templates/templateMap";
import API_URL from "../services/api";

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
        setLoading(true);
        setError("");

        // ========================================
        // VALIDATE USERNAME
        // ========================================

        if (!username) {
          throw new Error(
            "Username is required."
          );
        }

        // ========================================
        // PUBLIC PORTFOLIO API
        // ========================================

        const response = await fetch(
          `${API_URL}/api/public/${encodeURIComponent(
            username
          )}`,
          {
            method: "GET",
          }
        );

        // ========================================
        // RESPONSE
        // ========================================

        const data =
          await response.json();

        console.log(
          "PUBLIC PORTFOLIO DATA:",
          data
        );

        // ========================================
        // API ERROR
        // ========================================

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Portfolio not found"
          );
        }

        // ========================================
        // SAVE PORTFOLIO DATA
        // ========================================

        setPortfolio(data);

      } catch (error) {
        console.error(
          "Public Portfolio Error:",
          error
        );

        setError(
          error.message ||
            "Portfolio not found"
        );

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

        <Helmet>
          <title>
            Loading Portfolio | CodeFolio
          </title>

          <meta
            name="robots"
            content="noindex, nofollow"
          />
        </Helmet>

        <h2>
          Loading Portfolio...
        </h2>

      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error || !portfolio) {
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

        <h2>
          Portfolio Not Found
        </h2>

        <p>
          {error ||
            "The requested portfolio could not be found."}
        </p>

      </div>
    );
  }

  // ==========================================
  // PORTFOLIO DATA
  // ==========================================

  const {
    user,
    projects = [],
    skills = [],
  } = portfolio;

  // ==========================================
  // SAFETY CHECK
  // ==========================================

  if (!user) {
    return (
      <div className="public-portfolio">

        <Helmet>

          <title>
            Portfolio Not Found | CodeFolio
          </title>

          <meta
            name="robots"
            content="noindex, nofollow"
          />

        </Helmet>

        <h2>
          Portfolio Not Found
        </h2>

        <p>
          User information is unavailable.
        </p>

      </div>
    );
  }

  // ==========================================
  // DYNAMIC SEO DATA
  // ==========================================

  const portfolioName =
    user.name?.trim() ||
    user.username ||
    "Developer";

  const portfolioProfession =
    user.profession?.trim() ||
    "Developer";

  const portfolioBio =
    user.bio?.trim() ||
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
    `${window.location.origin}/${encodeURIComponent(
      user.username
    )}`;

  // ==========================================
  // SOCIAL LINKS
  // ==========================================

  const socialLinks =
    user.socialLinks || {};

  // ==========================================
  // JSON-LD STRUCTURED DATA
  // ==========================================

  const structuredData = {
    "@context":
      "https://schema.org",

    "@type":
      "Person",

    name:
      portfolioName,

    jobTitle:
      portfolioProfession,

    url:
      portfolioUrl,

    description:
      portfolioBio,

    ...(user.profileImage && {
      image: user.profileImage,
    }),

    ...(socialLinks && {
      sameAs: [
        socialLinks.github,
        socialLinks.linkedin,
        socialLinks.twitter,
        socialLinks.website,
      ].filter(Boolean),
    }),
  };

  // ==========================================
  // SELECTED TEMPLATE
  // ==========================================

  const SelectedTemplate =
    templateMap[
      user.templateId
    ] ||
    templateMap.minimalist;

  // ==========================================
  // TEMPLATE DATA
  // ==========================================

  const templateData = {
    username:
      user.username || "",

    name:
      user.name || "",

    profession:
      user.profession || "",

    bio:
      user.bio || "",

    profileImage:
      user.profileImage || "",

    resumeUrl:
      user.resumeUrl || "",

    socialLinks:
      socialLinks,

    skills:
      skills,

    projects:
      projects,
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

        {/* ====================================
            PAGE TITLE
        ==================================== */}

        <title>
          {pageTitle}
        </title>

        {/* ====================================
            META DESCRIPTION
        ==================================== */}

        <meta
          name="description"
          content={portfolioBio}
        />

        {/* ====================================
            KEYWORDS
        ==================================== */}

        <meta
          name="keywords"
          content={`${portfolioName}, ${portfolioProfession}, developer, portfolio, CodeFolio, ${user.username}`}
        />

        {/* ====================================
            AUTHOR
        ==================================== */}

        <meta
          name="author"
          content={portfolioName}
        />

        {/* ====================================
            ROBOTS
        ==================================== */}

        <meta
          name="robots"
          content="index, follow"
        />

        {/* ====================================
            CANONICAL
        ==================================== */}

        <link
          rel="canonical"
          href={portfolioUrl}
        />

        {/* ====================================
            OPEN GRAPH
        ==================================== */}

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

        {/* ====================================
            TWITTER CARD
        ==================================== */}

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

        {/* ====================================
            JSON-LD
        ==================================== */}

        <script type="application/ld+json">
          {JSON.stringify(
            structuredData
          )}
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