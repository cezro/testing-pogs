import express, { Request, Response } from "express";
import { pool } from "../server";

const userRouter = express.Router();

// interface UserData {
//   sub: string
// }

// userRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const { sub } = req.body;
//     const client = await pool.connect();

//     const response = await client.query(
//       "SELECT * FROM users WHERE sub_id = $1",
//       [sub]
//     );

//     client.release();

//     if (response.rows.length === 0) {
//       res.status(404).json({ message: "user no found" });
//     }

//     if (response.rows.length > 0) {
//       res.status(200).json(response.rows);
//     }
//   } catch (error) {
//     console.log("Error fetching user", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

userRouter.post("/new", async (req: Request, res: Response) => {
  const { sub, role, balance } = req.body;

  console.log(sub);

  try {
    const client = await pool.connect();

    const selectQuery = await client.query(
      "SELECT * FROM users WHERE sub_id = $1",
      [sub]
    );
    const userExists = selectQuery.rows.length > 0;

    if (userExists) {
      return res
        .status(409)
        .json({ error: "There's already an existing user" });
    }

    const queryText =
      "INSERT INTO users (sub_id, role, balance) VALUES ($1, $2, $3)";
    const queryParams = [sub, role, balance];

    await client.query(queryText, queryParams);

    client.release();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export { userRouter };
