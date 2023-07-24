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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the destination folder where files will be saved.
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`); // Use the original file name for storing the file.
  },
});

const upload = multer({ storage: storage });
//const upload = multer({ dest: "uploads/" }); // Set the destination folder for storing the uploaded files

const router = Express.Router();

router.post("/action", actionProject);
router.post("/submit", upload.single("file"), protect, submitProject);
router.post("/getbyid", protect, getProject);
router.post("/all", protect, getAllProject);
router.post(
  "/createTask",
  protect,
  // upload.single("apiselectedFile"),

  upload.fields([
    { name: "apiselectedFile", maxCount: 1 },
    { name: "networkselectedFile", maxCount: 1 },
  ]),
  createTask
);
router.post("/getTask", getTask);
router.post("/createReport", upload.array("files"), protect, creatReport);

export default router;
