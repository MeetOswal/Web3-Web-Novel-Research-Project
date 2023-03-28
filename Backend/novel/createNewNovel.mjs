import express from "express";
import NOVEL from "../databaseSchema/novelCollection.mjs";
import multer from "multer";

const app = express.Router();
const upload = multer();

const multipleUpload = upload.fields([
    {name : "description"},
    {name : "language"},
    {name : "genre"}

])

app.post("/novel/new/:address", multipleUpload,async(req, res) => {

    const novel = new NOVEL({
        novelName : req.query.name,
        novelAddress : req.params.address,
        writer : req.query.author,
        novelDescription : req.body.description,
        language : req.body.language,
        genre : req.body.genre  
    })

    const result = await novel.save()
    res.send(result).status(200);
})

export default app;