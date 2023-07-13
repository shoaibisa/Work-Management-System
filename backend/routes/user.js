import Express from "express";
import { statusToggle } from "../controllers/user.js";
const router = Express.Router();

router.post("/status", statusToggle);

export default router;
