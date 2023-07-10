import { validationResult } from "express-validator";
import Employee from "../models/employee.js";
import authverifyToken from "../models/verifyToken.js";
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
const signUp = async (req, res) => {
  console.log(req);
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

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    payLoad = {
      email: req.body.email,
      name: req.body.name,
      userId: EmployeeId,
      password: encryptedPassword,
      role: req.body.role,
      phone: req.body.phone,
      department: req.body.selectedDepartment,
    };
  } catch (error) {
    return res
      .status(400)
      .send({ isError: true, title: "Error", message: "Something went wrong" });
  }

  const employee = new Employee(payLoad);
  //  const uri = `http://localhost:3000/auth/verifyUser/${token}`;

  try {
    const token = crypto.randomBytes(32).toString("hex");
    await authverifyToken({
      token: token,
      email: req.body.email,
    }).save();
  } catch (err) {
    return res.status(400).json({
      title: "Error",
      message: "Error in signUp",
    });
  }

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

export { signUp, signIn, getAllEmployees };
