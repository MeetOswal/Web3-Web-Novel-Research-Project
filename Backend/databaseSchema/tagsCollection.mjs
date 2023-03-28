import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    genre : String
})

const TAG = new mongoose.model("tag", tagSchema);

export default TAG;
