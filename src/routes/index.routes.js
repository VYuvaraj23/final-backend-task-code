import express from "express";
import usersRoutes from "./user.routes.js";

const router = express.Router();

router.use("/", usersRoutes);

router.get("/", (req, res) => {
  res
    .status(200)
    .send("<h1> User Authentication and Authorization with Bearer Token</h1>");
  res.end();
});
export default router;
