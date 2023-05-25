import express from "express";
import mongoose from "mongoose";
import createUser from "./user/user.mjs";
import updateUser from "./user/updateUser.mjs";
import bookmarkUpdate from "./user/toBookmark.mjs";
import subscribe from "./user/subscribe.mjs";
import deleteSubscribeMiddleware from "./user/deleteSubscribes.mjs";
import createNovel from "./novel/createNewNovel.mjs";
import addChapter from "./novel/addChapter.mjs";
import addFees from "./novel/addSubscriptionFee.mjs";
import addPreview from "./novel/addFreeChapter.mjs";
import addReview from "./novel/updateReview.mjs";
import chapterFile from "./novel/chapterFile.mjs";
const PORT = 5000;

const app = express();

try {
    mongoose.connect("mongodb://0.0.0.0:27017/novel",{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(() => console.log("connection success...")).catch((err)=> console.log(err));

app.get("/", (req, res) => {
    res.send("Success").status(200);
})

app.use(createUser);

app.use(updateUser);

app.use(bookmarkUpdate);

app.use(subscribe);

app.use(createNovel);

app.use(addChapter);

app.use(addFees);

app.use(addPreview);

app.use(addReview);

app.use(chapterFile);


let timer = 0;
setInterval(deleteSubscribe, (timer * 3600000 ));

async function deleteSubscribe(){
  await deleteSubscribeMiddleware();
  timer = 1;
}

} catch (error) {
  console.log(error);
  re.send("Failure").status(404)  
}

app.listen(PORT);
console.log(`${PORT} is the PORT`);