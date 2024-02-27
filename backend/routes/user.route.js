import express from "express";
import { getUserProfileAndRepose } from "../controllers/user.controller";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepose);
export default router;
