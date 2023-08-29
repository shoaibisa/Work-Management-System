import nodemailer from "nodemailer";
// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Example: use your email service provider
  auth: {
    user: process.env.EMAIL_ADMIN, // Your email address
    pass: process.env.PASSWORD_E_ADMIN, // Your email password
  },
});

export default transporter;
