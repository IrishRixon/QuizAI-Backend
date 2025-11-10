
import express from "express";
import cors from 'cors';
import { questionsRouter } from "./routes/questions.js";
import connectDB from "./DB/connectDB.js"


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

const start = async () => {
    try {
        await connectDB();

        app.listen(3000, () => {
            console.log("Server is running on http://localhost:3000");
        });

    } catch (error) {
        console.log(error);
    }
}

start();