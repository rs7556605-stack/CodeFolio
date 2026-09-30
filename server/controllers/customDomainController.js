
const crypto = require("crypto");
const dns = require("dns").promises;

const CustomDomain = require("../models/CustomDomain");

// ==========================================
// ADD CUSTOM DOMAIN
// ==========================================
exports.addCustomDomain = async (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain || typeof domain !== "string") {
      return res.status(400).json({
        message: "Domain is required",
      });
    }

    const normalizedDomain = domain.trim().toLowerCase();

    // Validate domain format
    const domainRegex =
      /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

    if (!domainRegex.test(normalizedDomain)) {
      return res.status(400).json({
        message: "Please enter a valid domain, e.g. john.com",
      });
    }

    // Prevent mapping CodeFolio's own hosting domain
    if (
      normalizedDomain === "codefolio-web-ey1g.onrender.com" ||
      normalizedDomain.endsWith(".codefolio-web-ey1g.onrender.com")
    ) {
      return res.status(400).json({
        message: "Please enter your own custom domain",
      });
    }

    // Authentication middleware sets req.user to the user ID
    const userId = req.user;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Check whether this domain is already registered
    const existingDomain = await CustomDomain.findOne({
      domain: normalizedDomain,
    });

    if (existingDomain) {
      return res.status(409).json({
        message: "This domain is already registered",
      });
    }

    // Generate a secure ownership verification token
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

      verification: {
        type: "TXT",
        host: `_codefolio.${normalizedDomain}`,
        value: `codefolio-verification=${verificationToken}`,
        instructions:
          "Add this TXT record to your domain DNS settings to verify ownership.",
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

// ==========================================
// GET DOMAINS FOR LOGGED-IN USER
// ==========================================
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

// ==========================================
// VERIFY DOMAIN OWNERSHIP USING DNS TXT
// ==========================================
exports.verifyCustomDomain = async (req, res) => {
  try {
    const userId = req.user;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Only the domain owner can verify this domain
    const customDomain = await CustomDomain.findOne({
      _id: id,
      userId,
    }).select("+verificationToken");

    if (!customDomain) {
      return res.status(404).json({
        message: "Custom domain not found",
      });
    }

    if (customDomain.status === "verified") {
      return res.status(200).json({
        message: "Domain is already verified",
        status: "verified",
      });
    }

    const recordName = `_codefolio.${customDomain.domain}`;

    // Resolve TXT records from DNS
    const records = await dns.resolveTxt(recordName);

    const expectedValue =
      `codefolio-verification=${customDomain.verificationToken}`;

    // DNS TXT records can contain multiple string segments
    const isVerified = records.some((record) =>
      record.join("") === expectedValue
    );

    if (!isVerified) {
      return res.status(400).json({
        message: "DNS TXT record does not match",
        status: "pending",
      });
    }

    // Update verification status only after token matches
    customDomain.status = "verified";
    customDomain.verifiedAt = new Date();

    await customDomain.save();

    return res.status(200).json({
      message: "Domain verified successfully",
      status: "verified",
    });
  } catch (error) {
    if (
      error.code === "ENODATA" ||
      error.code === "ENOTFOUND" ||
      error.code === "ENONAME"
    ) {
      return res.status(400).json({
        message: "DNS TXT record not found yet",
        status: "pending",
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid domain ID",
      });
    }

    console.error("Verify custom domain error:", error.message);

    return res.status(500).json({
      message: "Unable to verify custom domain",
    });
  }
};