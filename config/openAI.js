import { configDotenv } from "dotenv";
configDotenv();
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.OPENAI_API_KEY,
});

export default openai;