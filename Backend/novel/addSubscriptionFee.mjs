import express from "express";
import NOVEL from "../databaseSchema/novelCollection.mjs";

const app = express.Router();

app.patch("/novel/fees/:address",async(req, res) => {

    await NOVEL.updateOne({novelAddress: req.params.address},{
        $set : {
            subscriptionFee : req.query.fees
        }
    })
    res.send("Success").status(200);
})

export default app;