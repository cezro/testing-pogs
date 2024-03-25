import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import pogsRouter from "./routes/pogs";
import pogsValueRouter from "./routes/pog-values";

dotenv.config();
const port = process.env.PORT;
console.log(port);

const connection = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connection,
});

export const app = express();

async function startServer() {
  app
    .use(cors())
    .use(express.json())
    .use("/api/pog-values", pogsValueRouter)
    .use("/api/pogs", pogsRouter)
    .get("/", async (req: express.Request, res: express.Response) => {
      res.json({ message: "success" });
    })

    .listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
}

startServer();
