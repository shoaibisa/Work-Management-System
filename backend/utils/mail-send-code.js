import nodemailer from "nodemailer";

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.EMAIL_ADMIN,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "PMS",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    return info;
  } catch (error) {
    console.log(error.message);
  }
};

export default mailSender;
