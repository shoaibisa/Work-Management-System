import Express from "express";
import { statusToggle, getUserById, getAllUsers } from "../controllers/user.js";
const router = Express.Router();

router.post("/status", statusToggle);
router.post("/role", statusToggle);
router.post("/getById", getUserById);
router.get("/all", getAllUsers);

export default router;
