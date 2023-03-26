import mongoose from "mongoose";

const novelSchema = new mongoose.Schema({
    novelName: String,
    novelDescription : String,
    latestUpdate : Date,
    novelAddress : String,
    tags: Array,
    writer : String,
    language : String,
    freeChapters: Number,
    review : Number,
    reviewBy : Number,
    noveImage : String,
    releaseDate : {
        type: Date,
        default : Date.now()
    },
    subscriptionFee : Number,
    chapters : [{
        chapterTitle : String,
        index : Number
    }],
    comments : [{
        name : String,
        message : String
    }]
})

const NOVEL = new mongoose.model("novel", novelSchema);

export default NOVEL;