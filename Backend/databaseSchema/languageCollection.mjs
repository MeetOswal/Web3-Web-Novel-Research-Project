import mongoose from "mongoose";

const languageSchema = new mongoose.Schema({
    language : String
})

const LANGUAGE = new mongoose.model("language", languageSchema);

export default LANGUAGE;
