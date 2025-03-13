import { Router } from "express";
import { getAllHouses, getHouseById, likeUnlikeHouse, searchHouses } from '../controllers/houses.controller.js';
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router()

router.get("/", getAllHouses);
router.get("/:id", getHouseById)
router.post("/like/:houseId", protectRoute, likeUnlikeHouse)

export default router;