import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { pool } from "../server";
const pogsValueRouter = express.Router();

pogsValueRouter.use(logger);

pogsValueRouter.get("/", (req: Request, res: Response) => {});

pogsValueRouter.post("/new", async (req: Request, res: Response) => {
  const { pogId, price } = req.body;
  console.log(req.body);

  try {
    if (parseFloat(price) <= 0) {
      res.status(400).json({ message: "Price must be greater than 0" });
      throw new Error("Price must be greater than 0");
    }

    if (parseFloat(price) > 100000000) {
      res.status(400).json({ message: "Price must be less than 10,000,000" });
      throw new Error("Price must be less than 10,000,000");
    }

    const client = await pool.connect();

    const currentRow = await client.query(
      "SELECT value FROM pog_values WHERE pog_id = $1 ORDER BY createdAt DESC LIMIT 1",
      [pogId]
    );

    let prevValue = null;

    if (currentRow.rows.length > 0) {
      prevValue = currentRow.rows[0].value;
    }

    const response = await client.query(
      "INSERT INTO pog_values (pog_id, value, prev_value) VALUES ($1, $2, $3) RETURNING id",
      [pogId, parseFloat(price), prevValue]
    );

    client.release();

    const newPogValueId = response.rows[0].id;

    res
      .status(201)
      .json({ id: newPogValueId, message: "POG value created successfully" });

    console.log("New POG value created with id: ", newPogValueId);

    // Release pool
  } catch (error) {
    console.error("Error inserting value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

pogsValueRouter.route("/:id").get(async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const response = await client.query(
      "SELECT value, createdAt, prev_value FROM pog_values WHERE pog_id = $1",
      [id]
    );

    client.release();

    if (response.rows.length === 0) {
      res.status(404).json({ message: "POG value not found" });
      return;
    }
    console.log(response.rows);

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error fetching POG value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

pogsValueRouter.param(
  "id",
  (req: Request, res: Response, next: NextFunction, id) => {
    // req: Request.user = users[id];
    // console.log(req: Request.user)
    next();
  }
);

function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Time: ", Date.now());
  console.log(req.originalUrl, "logger");
  next();
}

export default pogsValueRouter;
