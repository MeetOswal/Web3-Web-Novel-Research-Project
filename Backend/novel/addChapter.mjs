import express from "express";
import NOVEL from "../databaseSchema/novelCollection.mjs";

const app = express.Router();

app.patch("/novel/chapter/:address",async(req, res) => {

    const object = {
        chapterTitle : req.query.name,
        index : req.query.index
    }
    await NOVEL.updateOne({novelAddress: req.params.address},{
        $push : {
            chapters : object
        }
    })
    res.send("Success").status(200);
})

export default app;