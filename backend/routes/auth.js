import { check } from "express-validator";
import Express from "express";
import { protect } from "../middleware/employeeMiddleware.js";
import multer from "multer";

import {
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
} from "../controllers/auth.js";

import { createProject, createTask } from "../controllers/project.js";

const router = Express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder where files will be saved.
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Use the original file name for storing the file.
  },
});

const upload1 = multer({ storage: storage });
const upload = multer({ dest: "uploads/" }); // Set the destination folder for storing the uploaded files

router.post(
  "/sign-up",
  upload1.single("profileimg"),
  [
    check("name", "Name is required").trim(),
    check("email", "Email is required").trim().isEmail().normalizeEmail(),
    check("phone", "phone no is required").trim(),
    check("password", "Password should be at least 3 chars").isLength({
      min: 3,
    }),
  ],
  signUp
);

router.post(
  "/sign-in",
  [
    check("email", "Email is required").trim().isEmail(),
    check("password", "Password field is required").isLength({
      min: 3,
    }),
  ],
  signIn
);

router.post("/createproject", protect, createProject);
router.post("/createtask", upload.single("file"), protect, createTask);
router.get("/allemployees", getAllEmployees);
router.get("/profile", protect, profile);
router.get("/verifyUser/:id/:token", verifyUser);
router.post("/forgetpassword", forgetPassword);
// router.get("/forgotPassword", getForgotPassword);
// router.get("/resetPassword/:id/:token", getResetPassword);
router.post("/resetpassword", resetPassword);

export default router;
