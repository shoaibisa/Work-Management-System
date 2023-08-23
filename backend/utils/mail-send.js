import nodemailer from "nodemailer";
// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: "Gmail", // Example: use your email service provider
  auth: {
    user: "your_email@gmail.com", // Your email address
    pass: "your_email_password", // Your email password
  },
});

export default transporter;
