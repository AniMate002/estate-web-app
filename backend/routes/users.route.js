import { Router } from "express";
import { getAllUsers, getUserById, userUpdate } from "../controllers/users.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/", protectRoute, userUpdate);

export default router;