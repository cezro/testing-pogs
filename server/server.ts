import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import pogsRouter from "./routes/pogs";
import pogsValueRouter from "./routes/pog-values";
import { handleLogin } from "./routes/authRoutes";
import { userRouter } from "./routes/createUser";
import { messagesRouter } from "./messages/messages.router";

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
    .use("/api/messages", messagesRouter)
    .post("/api/user", userRouter)
    .get("/", async (req: Request, res: Response) => {
      res.json({ message: "success" });
    })

    .listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
}

startServer();
