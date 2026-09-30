
const express = require("express");

const protect = require("../middleware/authMiddleware");
const requirePro = require("../middleware/proMiddleware");

const {
  addCustomDomain,
  getMyDomains,
} = require("../controllers/customDomainController");

const router = express.Router();

// All domain routes require login.
router.use(protect);

// All domain routes also require Pro access.
router.use(requirePro);

router.post("/", addCustomDomain);
router.get("/", getMyDomains);

module.exports = router;