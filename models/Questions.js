import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new mongoose.Schema ({
    question:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    questiontype:{
        type: String,
        required: true
    },
    ans:{
        type: String,
        required: false
    },
    ans1:{
        type: String,
        required: false
    },
    ans2:{
        type: String,
        required: false
    },
    ans3:{
        type: String,
        required: false
    }, 
})

export default mongoose.model("Question", QuestionSchema)