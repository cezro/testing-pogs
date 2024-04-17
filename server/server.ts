import express from "express";
import cors from "cors";
import { Pool } from "pg";
import dotenv from "dotenv";
import pogsRouter from "./routes/pogs";
import pogsValueRouter from "./routes/pog-values";
import { auth } from "express-openid-connect";
import userRouter from "./routes/user";

dotenv.config();
const port = process.env.PORT;
console.log(port);

const connection = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString: connection,
});

export const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:8080",
  clientID: "LHUgucjT1ME5jA1KQJ1BZNeCrRupUKdo",
  issuerBaseURL: "https://dev-kopf046sfhwyw7r4.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

async function startServer() {
  app
    .use(cors())
    .use(express.json())
    .use("/api/pog-values", pogsValueRouter)
    .use("/api/pogs", pogsRouter)
    .use("/api/user", userRouter)
    .get("/", async (req: express.Request, res: express.Response) => {
      res.json({ message: "success" });
    })

    .listen(port, () => {
      console.log(`App listening on port http://localhost:${port}`);
    });
}

startServer();
