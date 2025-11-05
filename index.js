
import express from "express";
import cors from 'cors';
import { questionsRouter } from "./routes/questions.js";


const app = express();

const corsOpstions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}

app.use(cors(corsOpstions));
app.use(express.json());
app.use("/", questionsRouter);

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
})