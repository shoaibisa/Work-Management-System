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
  listOfClients,
  getEmployeeTaskId,
  getClientById,
} from "../controllers/user.js";
import { protect } from "../middleware/employeeMiddleware.js";

const router = Express.Router();

router.post("/status", statusToggle);
router.post("/role", roleSet);
router.post("/getById", protect, getUserById);
router.get("/all", getAllUsers);
router.post("/department", getEmployeeByDepartment);
router.post("/tasks", protect, getEmployeeTask);
router.post("/gettasksbyemployeeid", protect, getEmployeeTaskId);

router.post("/reports", protect, getEmployeeReport);
router.get("/managers", listOfManagers);
router.get("/employees", protect, listOfEmployees);
router.post("/getEmployeeById", protect, getEmployeeById);
router.post("/getManagerById", protect, getManagerById);
router.get("/clients", listOfClients);
router.get("/getclientbyid/:id", protect, getClientById);

export default router;
