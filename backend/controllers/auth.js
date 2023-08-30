import { validationResult } from "express-validator";
import Employee from "../models/employee.js";
import mailSender from "../utils/mail-send-code.js";
import Notification from "../models/notification.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

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
const signUp = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(201).send({
      title: "Error",
      message: errors.array(),
      isError: true,
    });
  }

  if (await Employee.findOne({ email: req.body.email })) {
    return res.status(208).send({
      title: "Error",
      message: "The email is already registered. Redirecting to signin page!",
      isError: true,
    });
  }

  if (await Employee.findOne({ phone: req.body.phone })) {
    console.log("number registered");
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

  const encryptedPassword = await bcrypt.hash(password, 10);
  payLoad = {
    email: req.body.email,
    name: req.body.name,
    userId: EmployeeId,
    password: encryptedPassword,
    role: req.body.role,
    phone: req.body.phone,
    department: req.body.selectedDepartment.toLowerCase(),
    userToken: token,
  };

  const employee = new Employee(payLoad);
  const uri = `${process.env.BACKEND_URL}/auth/verifyUser/${employee._id}/${token}`;

  const bodypart = `<h1>Hi ${employee.name}</h1>
    <h3>Click on the link below to verify your email</h3>
    <a href="${uri}">Click here to verify</a>`;

  const callFun = await mailSender(
    employee.email,
    "Verify your email",
    bodypart
  );

  const notification = new Notification({
    title: "New Employee",
    message: `${employee.name} has joined the company`,
    employee: employee._id,
  });
  await notification.save();

  const userAdmins = await Employee.find({ role: "admin" });
  userAdmins.forEach(async (admin) => {
    admin.notifications.push(notification._id);
    await admin.save();
  });

  employee
    .save()
    .then(() => {
      console.log("user registered to db!");
      return res.status(200).send({
        title: "Success",
        message: "Redirecting to gmail in 3s...",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        isError: true,
        title: "Error",
        message: err,
      });
    });
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
  const bodypart = `<h1>Hi ${employee.name}</h1>

    <h3>Click on the link below to reset your password</h3>
    <a href="${uri}">Click here to reset</a>`;
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
const postResetPassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
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
      const encryptedPassword = await bcrypt.hash(password, 10);
      employee.password = encryptedPassword;
      employee.resetToken = "";
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

export {
  signUp,
  signIn,
  getAllEmployees,
  profile,
  verifyUser,
  getForgotPassword,
  getResetPassword,
  postResetPassword,
};
