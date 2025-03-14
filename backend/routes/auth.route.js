import { Router } from "express";
import { singUp, logIn, logOut, getMe } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router()

router.get("/me", protectRoute, getMe)
router.post("/signup", singUp)
router.post("/login", logIn)
router.post("/logout", protectRoute, logOut)

export default router;