import express from "express";
import { getUserProfileAndRepose } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepose);
export default router;
