import Express from "express";
import {
  statusToggle,
  getUserById,
  getAllUsers,
  getEmployeeByDepartment,
  roleSet,
  getEmployeeTask,
  getEmployeeReport,
  listOfManagers,
  listOfEmployees,
  getEmployeeById,
  getManagerById,
} from "../controllers/user.js";
import { protect } from "../middleware/employeeMiddleware.js";

const router = Express.Router();

router.post("/status", statusToggle);
router.post("/role", roleSet);
router.post("/getById", getUserById);
router.get("/all", getAllUsers);
router.post("/department", getEmployeeByDepartment);
router.post("/tasks", protect, getEmployeeTask);
router.post("/reports", protect, getEmployeeReport);
router.get("/managers", protect, listOfManagers);
router.get("/employees", protect, listOfEmployees);
router.post("/getEmployeeById", protect, getEmployeeById);
router.post("/getManagerById", protect, getManagerById);

export default router;
