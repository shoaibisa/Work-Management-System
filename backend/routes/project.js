import Express from "express";
import {
  actionProject,
  submitProject,
  getProject,
  getAllProject,
  createTask,
  getTask,
  getTaskByProject,
  creatReport,
  assignEmployee,
  addRemark,
  complteReport,
  getReport,
  getReportsByUser,
  editReport,
  getReportsByUserId,
  getAllReportOfManager,
  getReportsByTaskId,
  taskComplete,
  getReportDataByProject,
  actionNotification,
  getNotifications,
  projectComplete,
  updateTask,
  getAllProjectbypM,
  someMoreDetails,
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
router.post("/getTask", protect, getTask);
router.post(
  "/createReport",
  upload.array("files"),
  // upload.array("pocFiles"),
  // upload.fields([{ name: "files" }, { name: "pocFiles" }]),
  protect,
  creatReport
);
router.post("/gettaskbyproject", protect, getTaskByProject);
router.post("/assignemployee", protect, assignEmployee);
router.post("/reportsbyuser", protect, getReportsByUser);
router.post("/editreport", protect, upload.array("pocFiles"), editReport);

router.post("/addremark", protect, addRemark);
router.post("/completetask", protect, complteReport);
router.post("/getreport", protect, getReport);
router.post("/getreportsbyuserid", protect, getReportsByUserId);
router.post("/getallreportsofmanager", protect, getAllReportOfManager);
router.post("/getreportsbytaskid", protect, getReportsByTaskId);
router.post("/taskcomplete", protect, taskComplete);
router.post("/getreportdatabyproject", protect, getReportDataByProject);
router.post("/actionnotification", protect, actionNotification);
router.post("/getnotifications", protect, getNotifications);
router.post("/projectcomplete", protect, projectComplete);
router.post("/updateTask", protect, updateTask);
router.post("/projectbyprojectmanager", protect, getAllProjectbypM);
router.post("/somemoredetails", protect, someMoreDetails);

export default router;
