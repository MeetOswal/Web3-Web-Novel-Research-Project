import USER from "../databaseSchema/userCollection.mjs";
import express from "express";

const app = express.Router();

app.patch("/subscribe/:address", async (req, res) => {

  const result = await USER.findOne({
    userAddress: req.params.address,
    "userSubscription.novel_id": req.query.novel_id,
  }).select({ _id: 0, userSubscription: 1 });

  if (result) {
    let date;
    for (const i of result.userSubscription) {
      if (i.novel_id === req.query.novel_id) {
        date = i.endDate;
        date = new Date(date.setMonth(date.getMonth() + parseInt(req.query.time)));
        break;
      }
    }

    await USER.updateOne(
      { userAddress: req.params.address },
      {
        $set : {
            "userSubscription.$[addressFilter].endDate" : date
        },
      },{
        arrayFilters : [{
            "addressFilter.novel_id" : req.query.novel_id
        }], "multi" : true
      }
    );


  }else{

    let date;
    date = new Date;
    date = new Date(date.setMonth(date.getMonth() + parseInt(req.query.time)));
    console.log(date);
    const object = {
        novel_id: req.query.novel_id,
        endDate: date
      };
      console.log(object);
      await USER.updateOne(
        { userAddress: req.params.address },
        {
          $push: {
            userSubscription: object,
          }
  
        }
      );
  }
  res.send("Success");
});

export default app;
