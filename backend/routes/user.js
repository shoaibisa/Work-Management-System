import Express from "express";
import {
  statusToggle,
  getUserById,
  getAllUsers,
  getEmployeeByDepartment,
  roleSet,
  getEmployeeTask,
} from "../controllers/user.js";
import { protect } from "../middleware/employeeMiddleware.js";

const router = Express.Router();

router.post("/status", statusToggle);
router.post("/role", roleSet);
router.post("/getById", getUserById);
router.get("/all", getAllUsers);
router.post("/department", getEmployeeByDepartment);
router.post("/tasks", protect, getEmployeeTask);

export default router;
