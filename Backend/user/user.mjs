import express from "express";
import USER from "../databaseSchema/userCollection.mjs";
const app = express.Router();

app.post("/user/:address",async(req, res) => {
    try {
        if(!await USER.findOne({userAddress : req.params.address})){
            const user = new USER({
                userAddress : req.params.address,
                userName : req.params.address,
                userImage : "https://default.image"
            })
        await user.save();
        }       

        res.send("Success").status(200);
    } catch (error) {
        console.log(error);
        res.send("Failure").status(400);
    }
})

export default app;