import express, { NextFunction } from "express";
import { Request, Response } from "express";
import { pool } from "../server";
const pogsTransactRouter = express.Router();

pogsTransactRouter.use(logger);

pogsTransactRouter.get("/", (req: Request, res: Response) => {});

pogsTransactRouter.post("/new", async (req: Request, res: Response) => {
  const { pogId, sub_id, quantity } = req.body;
  console.log(req.body);

  try {
    const client = await pool.connect();

    const response = await client.query(
      "INSERT INTO portfolio (pog_id, sub_id, quantity) VALUES ($1, $2, $3) RETURNING id",
      [pogId, sub_id, quantity]
    );

    client.release();

    const newPogTransactId = response.rows[0].id;

    res.status(201).json({
      id: newPogTransactId,
      message: "POG value created successfully",
    });

    console.log(
      "New pog in user portfolio created with id: ",
      newPogTransactId
    );

    // Release pool
  } catch (error) {
    console.error("Error inserting value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

pogsTransactRouter.route("/:id").get(async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const client = await pool.connect();
    const response = await client.query(
      "SELECT sub_id, pog_id, quantity  FROM portfolio WHERE sub_id = $1",
      [id]
    );

    client.release();

    if (response.rows.length === 0) {
      res.status(404).json({ message: "POG in portfolio not found" });
      return;
    }
    console.log(response.rows);

    res.status(200).json(response.rows);
  } catch (error) {
    console.error("Error fetching portfolio value:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

pogsTransactRouter.param(
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

export default pogsTransactRouter;
