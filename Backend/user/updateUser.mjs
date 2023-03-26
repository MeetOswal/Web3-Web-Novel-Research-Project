import express from "express";
import multer from "multer";
import USER from "../databaseSchema/userCollection.mjs";
import fs from "fs";
const app = express.Router();
var mimetypevalue;
var fileExtension;
var filename;
const storage = multer.diskStorage({
    destination: async(req, file, cb) => {
      cb(null, `./data/`);
    },
  
    filename: (req, file, cb) => {
      mimetypevalue = file.mimetype.split("/");
      fileExtension = file.originalname.split(".");
      let x = Math.floor(Math.random() * 10000 + 1);
      filename = `${x}_${fileExtension[0]}}`;
      cb(null, `${filename}.${fileExtension[1]}`);
    },
  });

  
const upload = multer({storage : storage});

const uploadMultiple = upload.fields([
    {name : "image"},
    {name : "username"},
])
app.patch("/update/:address",uploadMultiple, async(req, res) => {
    try {
        if(req.query.image){
            //awiat toIPFS
            await USER.updateOne({userAddress : req.params.address},{
                $set : {
                    userImage : "https://image.com/"
                }
            })
            fs.unlinkSync(`./data/${filename}.${fileExtension[1]}`);
        }
        if(req.query.name){
            await USER.updateOne({userAddress : req.params.address},{
                $set : {
                    userName : req.body.username
                }
            })
        }
    
        res.send("Success").status(200);

    } catch (error) {

        console.log(error);

        res.send("Failure").status(400);
    }
})

export default app;