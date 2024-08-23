import express from "express";
import { updateUser, deleteUser, getUser, updateRank } from "../controllers/user.js";
import { verifyUser, verifyToken } from "../util/verifyToken.js"

const router = express.Router();

router.put("/:id", updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.put("/updateRank/:_id", updateRank);

export default router;