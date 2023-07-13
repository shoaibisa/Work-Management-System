import Express from "express";
import { actionProject } from "../controllers/project.js";

const router = Express.Router();

router.post("/action", actionProject);

export default router;
