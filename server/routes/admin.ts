import express, { Request, Response } from "express";
import { pool } from "../server";

const adminRouter = express.Router();

adminRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { sub } = req.body;
    const client = await pool.connect();

    const response = await client.query(
      "SELECT * FROM users WHERE sub_id = $1",
      [sub]
    );

    response.rows[0];
    console.log(response.rows[0]);

    client.release();

    if (response.rows.length > 0) {
      res.status(200).json(response.rows[0].role);
    }
  } catch (error) {
    console.log("Error fetching user", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default adminRouter;
