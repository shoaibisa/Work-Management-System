import Express from "express";
import { actionProject, submitProject } from "../controllers/project.js";
import { protect } from "../middleware/employeeMiddleware.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" }); // Set the destination folder for storing the uploaded files

const router = Express.Router();

router.post("/action", actionProject);
router.post("/submit", upload.single("file"), protect, submitProject);
export default router;
