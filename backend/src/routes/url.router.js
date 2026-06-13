import {
    createShortUrl,
} from "../controller/Url.controller.js";
import timeout from "../middleware/timeout.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/shortner").post(timeout,createShortUrl);

export default router;