import { Router } from "express";
import { getAllHouses, getHouseById } from '../controllers/houses.controller.js';

const router = Router()

router.get("/", getAllHouses);
router.get("/:id", getHouseById)

export default router;