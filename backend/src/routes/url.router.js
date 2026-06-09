import {
    createShortUrl,
    handleUrlRedirection
} from "../controller/Url.controller";
import {Router} from "express";

const router = Router();

router.route('/shortner',createShortUrl);
router.route('/redirect', handleUrlRedirection);

export default router;