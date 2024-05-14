import mongoose from "mongoose";

const AnswerSchema = mongoose.Schema({
    id:{
        type:Number,
        require:true
    },
    answer:{
        type:String,
        require:true
    }
},{timestamps:true})

export default mongoose.model("Answer",AnswerSchema);