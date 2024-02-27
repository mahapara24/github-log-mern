import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/");
});
