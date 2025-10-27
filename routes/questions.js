import express from "express";
export const questionsRouter = express.Router();
import { postQuestions } from "../controllers/questions.js";

questionsRouter.route('/questions').post(postQuestions);