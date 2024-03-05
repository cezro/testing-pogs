import express from "express";

import pogsRouter from "./routes/pogs";

const app = express();
const port = 3000;

app.use("/pogs", pogsRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
