import express from "express";

const router = express.Router();

router.get("/profile/:username", (req, res) => {
  res.send("User Profile is Ready!");
});

export default router;
