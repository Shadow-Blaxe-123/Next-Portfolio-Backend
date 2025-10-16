import express, { Application } from "express";

const app: Application = express();

app.use("/", (req, res) => {
  res.send("Hello World");
});

export default app;
