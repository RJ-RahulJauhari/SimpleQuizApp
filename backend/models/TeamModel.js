import mongoose from "mongoose";

const TeamSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    answers:{
        type:[String],
        require:false
    }
},{timestamps:true})

export default mongoose.model("Team",TeamSchema);