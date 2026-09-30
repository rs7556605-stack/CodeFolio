const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

// Same response for existing and non-existing email addresses.
const RESET_REQUEST_MESSAGE =
  "If an account exists for this email, a password reset link will be sent.";

// ===============================
// REGISTER USER
// ===============================
const registerUser = async (req, res) => {
  try {
    const { username, email, password, name } = req.body || {};

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim().toLowerCase();

    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { username: normalizedUsername },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
      name: name || "",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// LOGIN USER
// ===============================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        message: "Server configuration error",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        templateId: user.templateId,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// ===============================
// FORGOT PASSWORD
// POST /api/auth/forgot-password
// ===============================
const forgotPassword = async (req, res) => {
  try {
    const email =
      typeof req.body?.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    // Do not reveal whether this email is registered.
    if (!user) {
      return res.status(200).json({
        message: RESET_REQUEST_MESSAGE,
      });
    }

    const frontendUrl = process.env.FRONTEND_URL;
    const resendApiKey = process.env.RESEND_API_KEY;
    const senderEmail = process.env.RESEND_FROM_EMAIL;

    if (!frontendUrl || !resendApiKey || !senderEmail) {
      console.error(
        "Password reset email configuration is incomplete"
      );

      return res.status(503).json({
        message: "Password reset email is temporarily unavailable.",
      });
    }

    // Generate a cryptographically secure random token.
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store only the SHA-256 hash in MongoDB.
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    user.passwordResetToken = hashedToken;
    user.passwordResetExpires = expiry;

    await user.save();

    const baseUrl = frontendUrl.replace(/\/+$/, "");
    const resetUrl =
      `${baseUrl}/reset-password/${resetToken}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Reset your CodeFolio password</h2>

        <p>We received a request to reset your password.</p>

        <p>
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 12px 20px;
              background: #2563eb;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
            "
          >
            Reset Password
          </a>
        </p>

        <p>This link expires in 15 minutes.</p>

        <p>
          If you did not request a password reset, you can ignore
          this email.
        </p>
      </div>
    `;

    try {
      const emailResponse = await fetch(
        "https://api.resend.com/emails",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: senderEmail,
            to: [user.email],
            subject: "Reset your CodeFolio password",
            html: emailHtml,
          }),
        }
      );

      if (!emailResponse.ok) {
        const providerError = await emailResponse.text();

        console.error(
          "Resend email error:",
          emailResponse.status,
          providerError
        );

        throw new Error("Password reset email could not be sent");
      }
    } catch (emailError) {
      // Invalidate the token if email delivery could not be initiated.
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      throw emailError;
    }

    return res.status(200).json({
      message: RESET_REQUEST_MESSAGE,
    });
  } catch (error) {
    console.error("Forgot Password Error:", error.message);

    return res.status(500).json({
      message: "Unable to process the password reset request.",
    });
  }
};

// ===============================
// RESET PASSWORD
// POST /api/auth/reset-password/:token
// ===============================
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body || {};

    if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
      return res.status(400).json({
        message: "Invalid or expired reset link. Request a new one.",
      });
    }

    if (typeof password !== "string" || password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long.",
      });
    }

    // Avoid excessively large password inputs.
    if (Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        message: "Password must not exceed 72 bytes.",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    }).select("+passwordResetToken +passwordResetExpires");

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link. Request a new one.",
      });
    }

    user.password = await bcrypt.hash(password, 10);

    // One-time token: invalidate it immediately after use.
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful. Please log in.",
    });
  } catch (error) {
    console.error("Reset Password Error:", error.message);

    return res.status(500).json({
      message: "Unable to reset password. Please try again.",
    });
  }
};

// ===============================
// CURRENT USER
// GET /api/auth/me
// ===============================
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Get Me Error:", error.message);

    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getMe,
};