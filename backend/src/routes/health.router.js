import healthCheck from "../controller/health.controller.js";
import { Router } from "express";

const router = Router();

router.get("/health", healthCheck);

export default router;