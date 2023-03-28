import mongoose from "mongoose";

const novelSchema = new mongoose.Schema({
    novelName: String,
    novelDescription : String,
    latestUpdate : Date,
    novelAddress : String,
    genre: String,
    writer : String,
    language : String,
    freeChapters: {
        type : Number,
        default: 0
    },
    review : {
        type : Number,
        default : 0
    },
    reviewBy : {
        type : Number,
        defaut: 0
    },
    noveImage : String,
    releaseDate : {
        type: Date,
        default : Date.now()
    },
    subscriptionFee : {
        type : Number,
        default : 0
    },
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