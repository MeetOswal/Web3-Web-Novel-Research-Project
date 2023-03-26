import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type : String,
        unique : true
    },
    userImage : String,
    userAddress : {
        type : String,
        unique : true
    },
    userBookmark : [{
        novel_id : String
    }],
    userSubscription : [{
        novel_id : String
    }],
    userWork: [{
        novel_id : String
    }]
})

const USER = new mongoose.model("user", userSchema);

export default USER;