import express from "express";
export const questionsRouter = express.Router();
import { postQuestions, storeQuestions, getQuestionsToDB } from "../controllers/questions.js";

questionsRouter.route('/questions').post(postQuestions);
questionsRouter.route('/store-questions').post(storeQuestions);
questionsRouter.route('/getQuestionsToDB').post(getQuestionsToDB);