import express from "express";
import mongoose from "mongoose";
import createUser from "./user/user.mjs";
import updateUser from "./user/updateUser.mjs";
import bookmarkUpdate from "./user/toBookmark.mjs";
import subscribe from "./user/subscribe.mjs";

const PORT = 3000;

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

} catch (error) {
  console.log(error);
  re.send("Failure").status(404)  
}

app.listen(PORT);
console.log(`${PORT} is the PORT`);