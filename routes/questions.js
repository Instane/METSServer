import express from "express";
import { createQuestions, getCategoryType } from "../controllers/question.js";
import { createError } from "../util/error.js"

const router = express.Router();

//CREATE
router.post("/create", createQuestions);

//UPDATE
router.get("/getCategoryType", getCategoryType);

export default router;