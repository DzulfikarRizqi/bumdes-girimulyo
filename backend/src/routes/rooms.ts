import { Router } from "express";
import { ROOMS } from "../lib/rooms.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(ROOMS);
});

export default router;
