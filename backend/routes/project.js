import Express from "express";
import {
  actionProject,
  submitProject,
  getProject,
  getAllProject,
  createTask,
  getTask,
  creatReport,
} from "../controllers/project.js";
import { protect } from "../middleware/employeeMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Set the destination folder for storing the uploaded files

const router = Express.Router();

router.post("/action", actionProject);
router.post("/submit", upload.single("file"), protect, submitProject);
router.post("/getbyid", protect, getProject);
router.post("/all", protect, getAllProject);
router.post("/createTask", upload.single("file"), protect, createTask);
router.post("/getTask", getTask);
router.post("/createReport", upload.array("files"), protect, creatReport);

export default router;
