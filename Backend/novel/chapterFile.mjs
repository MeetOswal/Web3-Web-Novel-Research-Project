import multer from "multer";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import uploadToIPFS from "./uploadToIPFS.mjs";
const app = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var filename;
var mimetypevalue = []
var fileExtension = [];
//multer defining local storage for data
const storage = multer.diskStorage({
  destination: async(req, file, cb) => {
    cb(null, `./data/`);
  },

  filename: (req, file, cb) => {
    mimetypevalue = file.mimetype.split("/");
    fileExtension = file.originalname.split(".");
    let x = Math.floor(Math.random() * 10000 + 1);
    filename = `${x}_${fileExtension[0]}_${mimetypevalue[0]}_${mimetypevalue[1]}`;
    cb(null, `${filename}.${fileExtension[1]}`);
  },
});

const upload = multer({ storage: storage });

app.post("/novel/upload/:address",upload.array("files"), async(req, res) => {
  
    try {
        const cloudLink = await uploadToIPFS(filename, fileExtension[1]);
        res.send({asn: cloudLink}).status(200)
    } catch (error) {
        console.log(error)
        res.send(error).status(200)
    }
})

export default app;