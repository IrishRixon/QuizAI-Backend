import openai from "../config/openAI.js";
import QuestionModel from "../models/questions.js";

export const postQuestions = async (req, res) => {
    try {
        const { selectedCategories, difficulty, numberOfQuestions } = req.body;

        console.log("Generating questions ...");

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content:
                        `You are a quiz master in a game. You will create ${numberOfQuestions} questions regarding this categories: ${selectedCategories} with the difficulty of ${difficulty}. Each question there are 4 choices. You will return a valid json with this Structure and the index of correct answer (0-3) base on choices [{ question: string, choices: string[], answer: number }]. Again make sure it is a valid json format`,
                },
            ],
            model: "deepseek-chat",
        });

        
        const raw = completion.choices[0].message.content;
        const clean = raw.replace(/```json|```/g, "").trim();
        console.log(clean);
        
        const arr = JSON.parse(clean);

        for (let i = 0; i < arr.length; i++) {
            await QuestionModel.create(arr[i])
        }

        res.status(200).json(arr);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error})
    }

};
