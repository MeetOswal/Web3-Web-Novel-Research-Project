import express from "express";
import NOVEL from "../databaseSchema/novelCollection.mjs";
import USER from "../databaseSchema/userCollection.mjs";

const app = express.Router();

app.patch("/novel/review/:address", async (req, res) => {
  let user = await USER.findOne({
    userAddress: req.query.address,
    "userReview.novelAddress": req.params.address,
  }).select({ userReview: 1 });

  if (user) {
    let previousReview = 0;
    for (const i of user.userReview) {
      if (i.novelAddress === req.params.address) {
        previousReview = i.review;
        break;
      }
    }
    const result = await NOVEL.findOne({
      novelAddress: req.params.address,
    }).select({ _id: 0, review: 1, reviewBy: 1 });

    let review = result.review * result.reviewBy;
    review =
      (review + parseInt(req.query.review) - previousReview) / result.reviewBy;
    await NOVEL.updateOne(
      { novelAddress: req.params.address },
      {
        $set: {
          review: review,
        },
      }
    );
    await USER.updateOne(
      { userAddress: req.query.address },
      {
        $set: {
          "userReview.$[addressFilter].review": req.query.review,
        },
      },
      {
        arrayFilters: [{
          "addressFilter.novelAddress": req.params.address,
        }],
        multi: true,
      }
    );
    res.send("Success").status(200);
  } else {
    const result = await NOVEL.findOne({
      novelAddress: req.params.address,
    }).select({ _id: 0, review: 1, reviewBy: 1 });
    let review = result.review * result.reviewBy;
    review = (review + parseInt(req.query.review)) / (result.reviewBy + 1);
    await NOVEL.updateOne(
      { novelAddress: req.params.address },
      {
        $inc: {
          reviewBy: 1,
        },
        $set: {
          review: review,
        },
      }
    );
    const object = {
        novelAddress: req.params.address,
        review: req.query.review,
    }
    await USER.updateOne(
      { userAddress: req.query.address },
      {
        $push: {
          userReview: object
        },
      }
    );
    res.send("Success").status(200);
  }
});

export default app;
