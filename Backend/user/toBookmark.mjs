import USER from "../databaseSchema/userCollection.mjs";
import express from "express";
const app = express.Router();

app.patch("/bookmark/:address", async(req, res) => {
    try {
        const result = await USER.findOne({userAddress : req.params.address, userBookmark : req.query.novel_id})
        
        if(!result){
            await USER.updateOne({userAddress : req.params.address},{
                $push: {
                    userBookmark : req.query.novel_id
                }
            })
        }else{
            await USER.updateOne({userAddress : req.params.address},{
                $pull :{
                    userBookmark : req.query.novel_id
                }
            })
        }

        res.send("Success").status(200);
    } catch (error) {
        console.log(error);
        res.send('Failure').status(400);
    }
})

export default app;