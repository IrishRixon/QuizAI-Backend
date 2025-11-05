import openai from "../config/openAI.js";

export const postQuestions = async (req, res) => {
    const { selectedCategories, difficulty, numberOfQuestions } = req.body;
    // const completion = await openai.chat.completions.create({
    //     messages: [
    //         {
    //             role: "system",
    //             content:
    //                 "You are a quiz master in a game. You will create 10 questions regarding this categories: [Food, Sports, Anime] with the difficulty of Easy. Each question there are 4 choices. You will return a valid json with this Structure and the index of correct answer (0-3) base on choices [{ question: string, choices: string[], answer: number }]",
    //         },
    //     ],
    //     model: "deepseek-chat",
    // });

    // console.log(completion.choices[0].message.content);
    console.log(selectedCategories);
    console.log(difficulty);
    console.log(numberOfQuestions);
};
