import express from "express";
import { createGame, getAmount, getByPlayer, getHighestScore, getHighestScoreCategory, getMostPlayedCategory } from "../controllers/games.js";

const router = express.Router();

router.post("/createGame", createGame);

router.get("/getByPlayer/:player", getByPlayer);

router.get("/getAmount/:player", getAmount);

router.get("/getMostPlayed/:player", getMostPlayedCategory);

router.get("/getHighestScore/:player", getHighestScore);

router.get("/highestscorecategory/:category", getHighestScoreCategory);

export default router;