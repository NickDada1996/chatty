import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  getUsersForSidebar,
  addMessage,
  getMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);

router.post("/addMessage", protectRoute, addMessage);

router.get("/getMessage/:id", protectRoute, getMessage);

export default router;
