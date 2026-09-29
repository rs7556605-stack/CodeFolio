
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const nodemailer = require("nodemailer");
const User = require("../models/User");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  family: 4,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 30000,
});

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message, username } = req.body;

    if (!name || !email || !message || !username) {
      return res.status(400).json({
        message: "Name, email, message and username are required",
      });
    }

    const user = await User.findOne({
      username: username.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "Portfolio owner not found",
      });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({
        message: "Email server configuration is missing",
      });
    }

    const mailOptions = {
      from: `"CodeFolio Contact" <${process.env.EMAIL_USER}>`,
      to: user.email,
      replyTo: email,
      subject: `New Portfolio Message from ${name}`,
      text: `You received a new message through your CodeFolio portfolio.

Name: ${name}
Email: ${email}
Portfolio: ${username}

Message:
${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Contact email sent successfully ✅");
    console.log("Message ID:", info.messageId);

    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT EMAIL ERROR:", error.message);
    console.error("Error code:", error.code);
    console.error("SMTP response:", error.response);

    return res.status(500).json({
      message: "Failed to send message",
    });
  }
};

module.exports = {
  sendContactMessage,
};