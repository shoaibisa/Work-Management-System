import { validationResult } from "express-validator";
import Employee from "../models/employee.js";
import mailSender from "../utils/mail-send-code.js";
import Notification from "../models/notification.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const maxAge = 7 * 24 * 60 * 60;
const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET, {
    expiresIn: maxAge,
  });
};

function generateEmployeeId(fullname, department) {
  const employeeInitials = fullname
    .split(" ")
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
  const uniqueNumber = uuidv4().split("-")[0].toUpperCase();
  const departmentInitials = department.slice(0, 2).toUpperCase();
  const employeeId = `${departmentInitials}-${employeeInitials}-${uniqueNumber}`;

  return employeeId;
}

// for Signup
// const signUp = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(201).send({
//       title: "Error",
//       message: errors.array(),
//       isError: true,
//     });
//   }

//   if (await Employee.findOne({ email: req.body.email })) {
//     return res.status(208).send({
//       title: "Error",
//       message: "The email is already registered. Redirecting to signin page!",
//       isError: true,
//     });
//   }

//   if (await Employee.findOne({ phone: req.body.phone })) {
//     console.log("number registered");
//     return res.status(208).send({
//       title: "Error",
//       message: "The phone number is already registered",
//       isError: true,
//     });
//   }

//   const EmployeeId = generateEmployeeId(
//     req.body.name,
//     req.body.selectedDepartment
//   );
//   const password = req.body.password;
//   let payLoad;

//   const token = crypto.randomBytes(32).toString("hex");

//   const encryptedPassword = await bcrypt.hash(password, 10);
//   payLoad = {
//     email: req.body.email,
//     name: req.body.name,
//     userId: EmployeeId,
//     password: encryptedPassword,
//     role: req.body.role,
//     phone: req.body.phone,
//     department: req.body.selectedDepartment.toLowerCase(),
//     userToken: token,
//   };

//   const employee = new Employee(payLoad);

//   const uri = `${process.env.BACKEND_URL}/auth/verifyUser/${employee._id}/${token}`;

//   const bodypart = `<h1>Hi ${employee.name}</h1>
//     <h3>Click on the link below to verify your email</h3>
//     <a href="${uri}">Click here to verify</a>`;

//   const callFun = await mailSender(
//     employee.email,
//     "Verify your email",
//     bodypart
//   );

//   const notification = new Notification({
//     notification: `${employee.name} has joined the company`,
//     employee: employee._id,
//     link: "/employee",
//   });
//   await notification.save();

//   const userAdmins = await Employee.find({ role: "admin" });
//   userAdmins.forEach(async (admin) => {
//     admin.notifications.push(notification._id);
//     await admin.save();
//   });

//   employee
//     .save()
//     .then(() => {
//       console.log("user registered to db!");
//       return res.status(200).send({
//         title: "Success",
//         message: "Redirecting to gmail in 3s...",
//       });
//     })
//     .catch((err) => {
//       return res.status(400).json({
//         isError: true,
//         title: "Error",
//         message: err,
//       });
//     });
// };

// signup controller function

const signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(201).send({
        title: "Error",
        message: errors.array(),
        isError: true,
      });
    }

    const emailExists = await Employee.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(208).send({
        title: "Error",
        message: "The email is already registered. Redirecting to signin page!",
        isError: true,
      });
    }

    const phoneExists = await Employee.findOne({ phone: req.body.phone });
    if (phoneExists) {
      return res.status(208).send({
        title: "Error",
        message: "The phone number is already registered",
        isError: true,
      });
    }

    const EmployeeId = generateEmployeeId(
      req.body.name,
      req.body.selectedDepartment
    );
    const password = req.body.password;
    let payLoad;

    const token = crypto.randomBytes(32).toString("hex");

    const img = req.file ? req.file.filename : "";

    const encryptedPassword = await bcrypt.hash(password, 10);
    payLoad = {
      email: req.body.email,
      name: req.body.name,
      userId: EmployeeId,
      password: encryptedPassword,
      role: req.body.selectedrole,
      phone: req.body.phone,
      department: req.body.selectedDepartment.toLowerCase(),
      userToken: token,
      profileImage: img,
    };

    const employee = new Employee(payLoad);

    const uri = `${process.env.BACKEND_URL}/auth/verifyUser/${employee._id}/${token}`;

    const bodypart = `<table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border-collapse: collapse;">
    <tr>
      <td style="background-color: #fff; padding: 20px; text-align: center;">
        <h1 style="color: #7c3aed;">Hello ${employee.name}</h1>
        <h3>Click on the button below to verify your email</h3>
        <a href="${uri}" style="background-color: #7c3aed; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Click here to verify</a>
      </td>
    </tr>
  </table>`;

    const callFun = await mailSender(
      employee.email,
      "Verify your email",
      bodypart
    );

    const notification = new Notification({
      notification: `${employee.name} has joined the company`,
      employee: employee._id,
      link: "/employee",
    });
    await notification.save();

    const userAdmins = await Employee.find({ role: "Admin" });
    userAdmins.forEach(async (admin) => {
      // Ensure admin.notifications is initialized as an array
      admin.notifications = admin.notifications || [];
      admin.notifications.push(notification._id);
      await admin.save();
    });

    await employee.save();

    console.log("User registered to db!");
    return res.status(200).send({
      title: "Success",
      message: "Redirecting to gmail in 3s...",
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      isError: true,
      title: "Error",
      message: err.message,
    });
  }
};

const verifyUser = async (req, res) => {
  const { id, token } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(400).send({
        isError: true,
        title: "Error",
        message: "Invalid token",
      });
    }

    if (employee.userToken === token) {
      employee.isVerified = true;
      employee.userToken = "";
      await employee.save();
      return res.render("success");
    } else {
      return res.status(400).send({
        isError: true,
        title: "Error",
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).send({
      isError: true,
      title: "Error",
      message: "Internal server error",
    });
  }
};

//For Sign in
const signIn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).json({
      message: errors.array(),
      isError: true,
    });
  }
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email }).exec();
    if (!employee) {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "This email is not registered. Redirecting to Signup page!",
      });
    }
    if (!employee.isVerified) {
      console.log("not verified");
      return res.status(206).send({
        isError: true,
        title: "Error",
        message: "Not verified! Please verify your mail",
      });
    }
    const condition = await bcrypt.compare(password, employee.password);
    if (condition) {
      const token = createToken(employee._id, employee.role);
      return res.status(200).send({
        token: token,
        id: employee._id,
        name: employee.name,
        userId: employee.userId,
        userRole: employee.role,
        isError: false,
      });
    } else {
      return res.status(208).send({
        isError: true,
        title: "Error",
        message: "The credentials are wrong!",
      });
    }
  } catch (error) {
    return res.status(500);
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const profile = async (req, res) => {
  res.send("Sucess");
};

const getForgotPassword = async (req, res) => {
  const { email } = req.body;
  const employee = await Employee.find({ email });
  if (!employee) {
    return res.status(400).send({
      isError: true,
      title: "Error",
      message: "Invalid email",
    });
  }
  const token = crypto.randomBytes(32).toString("hex");
  employee.resetToken = token;
  await employee.save();
  const uri = `${process.env.BACKEND_URL}/auth/resetPassword/${employee._id}/${token}`;
  const bodypart = `<!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              border-radius: 5px;
          }
  
          h1 {
              color: #333333;
              text-align: center;
          }
  
          h3 {
              color: #777777;
              text-align: center;
          }
  
          .button-container {
              text-align: center;
          }
  
          a.button {
              display: inline-block;
              margin: 20px auto;
              padding: 10px 20px;
              background-color: #7E57C2; /* Purple color */
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
          }
  
          a.button:hover {
              background-color: #5D42A7; /* Darker shade of purple on hover */
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Hi ${employee.name}</h1>
          <h3>Click on the link below to verify your email</h3>
          <div class="button-container">
              <a href="${uri}" class="button">Click here to verify</a>
          </div>
      </div>
  </body>
  </html>
  `;
  const callFun = await mailSender(
    employee.email,
    "Reset your password",
    bodypart
  );
  return res.status(200).send({
    isError: false,
    title: "Success",
    message: "Redirecting to gmail in 3s...",
  });
};

const getResetPassword = async (req, res) => {
  const { id, token } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(400).send({
        isError: true,

        title: "Error",
        message: "Invalid token",
      });
    }
    if (employee.resetToken === token) {
      return res.render("resetPassword", { id, token });
    } else {
      return res.status(400).send({
        isError: true,
        title: "Error",
        message: "Invalid token",
      });
    }
  } catch (error) {
    return res.status(500).send({
      isError: true,
      title: "Error",
      message: "Internal server error",
    });
  }
};

const resetPassword = async (req, res) => {
  const { userid, p1, token } = req.body;
  console.log(req.body);
  try {
    const employee = await Employee.findById(userid);

    if (!employee || employee.resetToken !== token) {
      return res.status(400).send({
        isError: true,
        title: "Error",
        message: "user not found",
      });
    }

    const encryptedPassword = await bcrypt.hash(p1, 10);

    employee.password = encryptedPassword;
    employee.resetToken = "";
    await employee.save();
    return res.status(200).send({
      success: true,
      message: "password changes success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "password changes failed",
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    // console.log("in backend function");
    const { email } = req.body;
    // console.log("backend me mail - ", req.body);
    const user = await Employee.findOne({ email: email });

    console.log(user);
    if (!user) {
      // user not registred yet
      return res.status(400).send({
        success: false,
        message: "user not registred",
      });
    }
    // mzil
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    await user.save();

    const url = `http://localhost:3000/auth/resetpassword/${user._id}/${token}`;

    const bodypart = ` <table style="width: 100%; max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; border-collapse: collapse;">
      <tr>
        <td style="background-color: #fff; padding: 20px; text-align: center;">
          <h1 style="color: #7c3aed;">Hello ${user.name}</h1>
          <h3>Click on the button below to verify your email</h3>
          <a href="${url}" style="background-color: #7c3aed; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Click here to verify</a>
        </td>
      </tr>
    </table>
      </body>
    </html>`;

    const callFun = await mailSender(user.email, "Verify your email", bodypart);

    return res.status(200).send({
      success: true,
      data: user,
      message: "Password reset email sent. Check your inbox.",
    });
  } catch (error) {
    return res.status(500).send({
      isError: true,
      title: "Error",
      message: "Internal server error",
    });
  }
};

export {
  signUp,
  signIn,
  getAllEmployees,
  profile,
  verifyUser,
  getForgotPassword,
  getResetPassword,
  // postResetPassword,
  forgetPassword,
  resetPassword,
};
