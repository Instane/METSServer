import mongoose from "mongoose";
const { Schema } = mongoose;

const GameSchema = new mongoose.Schema ({
    player:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    score:{
        type: Number,
        required: true
    },
    gametype:{
        type: String,
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Games", GameSchema)