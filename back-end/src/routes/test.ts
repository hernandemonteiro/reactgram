import express from "express";

const testRouter = express();

testRouter.get("/test", (req, res) => {
  res.send("this is a test route!");
});

export default testRouter;
