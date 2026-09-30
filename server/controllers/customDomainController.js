
const crypto = require("crypto");
const CustomDomain = require("../models/CustomDomain");

// Add a custom domain
exports.addCustomDomain = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain || typeof domain !== "string") {
      return res.status(400).json({
        message: "Domain is required",
      });
    }

    const normalizedDomain = domain.trim().toLowerCase();

    // Simplified domain format validation
   const domainRegex =
  /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

    if (!domainRegex.test(normalizedDomain)) {
      return res.status(400).json({
        message: "Please enter a valid domain, e.g. john.com",
      });
    }

    // Avoid mapping CodeFolio's own hosting domain
    if (
      normalizedDomain === "codefolio-web-ey1g.onrender.com" ||
      normalizedDomain.endsWith(".codefolio-web-ey1g.onrender.com")
    ) {
      return res.status(400).json({
        message: "Please enter your own custom domain",
      });
    }

    // This assumes your authentication middleware sets req.user.id.
    // We will verify this against your existing middleware before wiring routes.
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const existingDomain = await CustomDomain.findOne({
      domain: normalizedDomain,
    });

    if (existingDomain) {
      return res.status(409).json({
        message: "This domain is already registered",
      });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const customDomain = await CustomDomain.create({
      domain: normalizedDomain,
      userId,
      verificationToken,
      status: "pending",
    });

    return res.status(201).json({
      message: "Custom domain added successfully",
      domain: {
        id: customDomain._id,
        domain: customDomain.domain,
        status: customDomain.status,
        createdAt: customDomain.createdAt,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This domain is already registered",
      });
    }

    console.error("Add custom domain error:", error.message);

    return res.status(500).json({
      message: "Unable to add custom domain",
    });
  }
};

// Get domains belonging to the logged-in user
exports.getMyDomains = async (req, res) => {
  try {
   const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const domains = await CustomDomain.find({ userId })
      .select("domain status verifiedAt createdAt")
      .sort({ createdAt: -1 });

    return res.status(200).json({ domains });
  } catch (error) {
    console.error("Get custom domains error:", error.message);

    return res.status(500).json({
      message: "Unable to fetch custom domains",
    });
  }
};