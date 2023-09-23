import express from "express";
import { createLocation, getLocation } from "../controllers/location.js";

const router = express.Router();

router.post("/", createLocation);
router.get("/", getLocation);

export default router;
