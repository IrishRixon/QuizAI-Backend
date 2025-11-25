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
                        `You are a quiz master in a game. You will create ${numberOfQuestions} questions regarding this categories: ${selectedCategories} with the difficulty of ${difficulty}. Each question there are 4 choices. You will return a valid json with this Structure and the index of correct answer (0-3) base on choices and a category a question belong to according to the selectedCategories selected [{ question: string, choices: string[], answer: number, category: string }]. Again make sure it is a valid json format`,
                },
            ],
            model: "deepseek-chat",
        });


        const raw = completion.choices[0].message.content;
        const clean = raw.replace(/```json|```/g, "").trim();
        console.log(clean);

        const arr = JSON.parse(clean);

        res.status(200).json(arr);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }

};

export const storeQuestions = async (req, res) => {
    console.log("storing");
    try {
        const arr = req.body;
        let result;
        for (let i = 0; i < arr.length; i++) {
            result = await QuestionModel.create(arr[i])
        }

        console.log(result);
        res.status(204).json({ mess: 'done' });

    } catch (err) {
        console.log(err);
        res.status(404).json({ error: err });
    }
}

export const getQuestionsToDB = async (req, res) => {
    console.log("Getting questions from DB ...");
    try {
        const body = req.body;
        const quest = [];
        const limiter = body.numberOfQuestions + 10;

        const result = await QuestionModel.find({ category: { $in: body.selectedCategories, difficulty: body.difficulty } }).limit(limiter);

        for (let i = 0; i < body.numberOfQuestions; i++) {
            const randomIndex = Math.floor(Math.random() * result.length);
            quest.push(result[randomIndex]);
        }

        res.status(200).json(quest);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error })
    }

}
