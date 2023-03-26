import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    tag : String
})

const TAG = new mongoose.model("tag", tagSchema);

export default TAG;
