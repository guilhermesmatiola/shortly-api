import { Router } from "express";
import { postURL, getURLById, openURLshorten } from "../controllers/urlController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenSchemaValidation.js";
import { ValidateURL } from "../middlewares/urlSchemaValidation.js";

const router = Router();

router.post("/urls/shorten", tokenValidationMiddleware, ValidateURL, postURL);
router.get("/urls/:id", getURLById);
router.get("/urls/open/:shortUrl", openURLshorten);

export default router;