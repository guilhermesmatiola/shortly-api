import { Router } from "express";
import { postURL, getURLById, openURLshorten , deleteURLid, getUser} from "../controllers/urlController.js";
import { tokenValidationMiddleware } from "../middlewares/tokenSchemaValidation.js";
import { ValidateURL } from "../middlewares/urlSchemaValidation.js";

const router = Router();

router.post("/urls/shorten", tokenValidationMiddleware, ValidateURL, postURL);
router.get("/urls/:id", getURLById);
router.get("/urls/open/:shortUrl", openURLshorten);
router.delete("urls/:id", tokenValidationMiddleware, deleteURLid);
//router.delete("urls/:id", deleteURLid);
router.get("/users/me", tokenValidationMiddleware, getUser);

export default router;