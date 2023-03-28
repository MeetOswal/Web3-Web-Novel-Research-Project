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
    userBookmark : Array,
    userSubscription : [{
        novel_id : String,
        endDate : Date
    }],
    userWork: Array,
    userReview: [{
        novelAddress : String,
        review : Number
    }]
}) 

const USER = new mongoose.model("user", userSchema);

export default USER;