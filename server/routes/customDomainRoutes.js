
const express = require("express");

const protect = require("../middleware/authMiddleware");
const requirePro = require("../middleware/proMiddleware");

const {
  addCustomDomain,
  getMyDomains,
  verifyCustomDomain,
  deleteCustomDomain,
} = require("../controllers/customDomainController");

const router = express.Router();

// All domain routes require login
router.use(protect);

// All domain routes require Pro access
router.use(requirePro);

// Add a custom domain
router.post("/", addCustomDomain);

// Get domains belonging to the logged-in user
router.get("/", getMyDomains);

// Verify custom domain ownership using DNS TXT
router.post("/:id/verify", verifyCustomDomain);

// Delete a custom domain
router.delete("/:id", deleteCustomDomain);

module.exports = router;