
const User = require("../models/User");

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message, username } = req.body;

    if (!name || !email || !message || !username) {
      return res.status(400).json({
        success: false,
        message: "Name, email, message and username are required",
      });
    }

    // Find portfolio owner in MongoDB
    const user = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    if (!user || !user.email) {
      return res.status(404).json({
        success: false,
        message: "Portfolio owner not found",
      });
    }

    // Check Resend configuration
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;

    if (!apiKey || !fromEmail) {
      console.error("Resend configuration is missing");

      return res.status(500).json({
        success: false,
        message: "Email service is not configured",
      });
    }

    // Use test inbox during initial testing.
    // Otherwise send to the portfolio owner.
    const recipientEmail =
      process.env.CONTACT_TEST_EMAIL || user.email;

    // Send email using Resend HTTPS API
    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `CodeFolio Contact <${fromEmail}>`,
          to: [recipientEmail],
          reply_to: email,
          subject: `New Portfolio Message from ${name}`,
          text: `You received a new message through CodeFolio.

Name: ${name}
Email: ${email}
Portfolio: ${username}

Message:
${message}`,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Resend API Error:", result);

      return res.status(502).json({
        success: false,
        message: "Email service failed to send the message",
      });
    }

    console.log("Contact email accepted by Resend ✅");
    console.log("Resend Email ID:", result.id);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
};

module.exports = { sendContactMessage };