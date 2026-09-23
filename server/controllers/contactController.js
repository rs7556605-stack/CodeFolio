const nodemailer = require("nodemailer");
const User = require("../models/User");

const sendContactMessage = async (req, res) => {
  try {
    // =====================================================
    // GET FORM DATA
    // =====================================================

    const {
      name,
      email,
      message,
      username,
    } = req.body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (
      !name ||
      !email ||
      !message ||
      !username
    ) {
      return res.status(400).json({
        message:
          "Name, email, message and username are required",
      });
    }

    // =====================================================
    // FIND PORTFOLIO OWNER
    // =====================================================

    const user = await User.findOne({
      username: username
        .trim()
        .toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message:
          "Portfolio owner not found",
      });
    }

    // =====================================================
    // CHECK EMAIL CREDENTIALS
    // =====================================================

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS
    ) {
      console.error(
        "EMAIL_USER or EMAIL_PASS is missing in .env"
      );

      return res.status(500).json({
        message:
          "Email server configuration is missing",
      });
    }

    // =====================================================
    // CREATE GMAIL TRANSPORTER
    // =====================================================

    const transporter =
      nodemailer.createTransport({
        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

    // =====================================================
    // VERIFY SMTP CONNECTION
    // =====================================================

    await transporter.verify();

    console.log(
      "Gmail SMTP verified successfully ✅"
    );

    // =====================================================
    // EMAIL OPTIONS
    // =====================================================

    const mailOptions = {
      from:
        `"CodeFolio Contact" <${process.env.EMAIL_USER}>`,

      // Portfolio owner ka registered email
      to: user.email,

      // Visitor ko reply karne ke liye
      replyTo: email,

      subject:
        `New Portfolio Message from ${name}`,

      text: `
You received a new message through your CodeFolio portfolio.

----------------------------------------
CONTACT DETAILS
----------------------------------------

Name: ${name}
Email: ${email}
Portfolio: ${username}

----------------------------------------
MESSAGE
----------------------------------------

${message}

----------------------------------------

You can reply directly to this email to contact ${name}.
      `,
    };

    // =====================================================
    // SEND EMAIL
    // =====================================================

    const info =
      await transporter.sendMail(
        mailOptions
      );

    // =====================================================
    // EMAIL DEBUG INFORMATION
    // =====================================================

    console.log(
      "========== CONTACT EMAIL SENT =========="
    );

    console.log(
      "Message ID:",
      info.messageId
    );

    console.log(
      "Accepted:",
      info.accepted
    );

    console.log(
      "Rejected:",
      info.rejected
    );

    console.log(
      "Response:",
      info.response
    );

    console.log(
      "TO:",
      user.email
    );

    console.log(
      "FROM:",
      process.env.EMAIL_USER
    );

    console.log(
      "========================================="
    );

    // =====================================================
    // SUCCESS RESPONSE
    // =====================================================

    return res.status(200).json({
      message:
        "Message sent successfully ✅",
    });

  } catch (error) {

    // =====================================================
    // ERROR LOG
    // =====================================================

    console.error(
      "========== CONTACT EMAIL ERROR =========="
    );

    console.error(
      "Message:",
      error.message
    );

    console.error(
      "Code:",
      error.code
    );

    console.error(
      "Response:",
      error.response
    );

    console.error(
      "ResponseCode:",
      error.responseCode
    );

    console.error(
      "=========================================="
    );

    // =====================================================
    // ERROR RESPONSE
    // =====================================================

    return res.status(500).json({
      message:
        "Failed to send message",
    });
  }
};

// =========================================================
// EXPORT
// =========================================================

module.exports = {
  sendContactMessage,
};