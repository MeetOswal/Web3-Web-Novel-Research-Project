import express from "express";
import NOVEL from "../databaseSchema/novelCollection.mjs";

const app = express.Router();

app.patch("/novel/preview/:address",async(req, res) => {

    await NOVEL.updateOne({novelAddress: req.params.address},{
        $set : {
            freeChapters : req.query.chapters
        }
    })
    res.send("Success").status(200);
})

export default app;