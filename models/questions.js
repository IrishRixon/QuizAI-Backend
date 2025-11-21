import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    choices: {
        type: [String],
        required: true
    },
    answer: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const QuestionModel = mongoose.model("Question", questionSchema);

export default QuestionModel;