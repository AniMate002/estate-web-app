import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/users.controller.js";

const router = Router()

router.get("/", getAllUsers)
router.get("/:id", getUserById)

export default router;