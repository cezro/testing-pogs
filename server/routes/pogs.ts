import express from "express";
import { Request, Response, NextFunction } from "express";
import { pool } from "../server";
const pogsRouter = express.Router();

pogsRouter.use(logger);

pogsRouter.get("/", (req: Request, res: Response) => {});

pogsRouter.post("/new", async (req: Request, res: Response) => {
  const { name, ticker_symbol, price, color } = req.body;
  const parsedPrice = parseFloat(price);

  try {
    const client = await pool.connect();
    const response = await client.query(
      "INSERT INTO pogs (name, ticker_symbol, price, color) VALUES ($1,$2, $3, $4) RETURNING id",
      [name, ticker_symbol, parsedPrice, color]
    );

    const pogsId = response.rows[0].id;
    res.status(201).json({ id: pogsId, message: "Pogs created successfully" });
    console.log("Pogs created with id: ", pogsId);
    // release pool
    client.release();
  } catch (err) {
    console.error("Error creating pogs:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

pogsRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const client = await pool.connect();
      const response = await client.query("SELECT * FROM pogs WHERE id = $1", [
        id,
      ]);

      if (response.rows.length === 0) {
        res.status(404).json({ message: "Pogs not found" });
        return;
      }

      res.status(200).json(response.rows);
      client.release();
    } catch (err) {
      console.log(err);
      res.send("Error " + err);
    }
  })
  .put(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { name, ticker_symbol, price, color } = req.body;
    const parsedPrice = parseFloat(price);

    try {
      const client = await pool.connect();
      const response = await client.query(
        `
        UPDATE pogs SET name = $1, ticker_symbol = $2, price = $3, color = $4 WHERE id = $5 RETURNING id`,
        [name, ticker_symbol, parsedPrice, color, id]
      );

      const pogsId = response.rows[0].id;
      res
        .status(200)
        .json({ id: pogsId, message: "Pogs updated successfully" });
    } catch (err) {
      console.error("Error updating pogs:", err);
      res.status(422).json({ message: "Error updating pogs" });
    }
  })
  .delete(async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const client = await pool.connect();
      const response = await client.query("DELETE FROM pogs WHERE id = $1", [
        id,
      ]);
      res.status(200).json({ message: "Pogs deleted successfully" });
    } catch (err) {
      console.error("Error deleting pogs:", err);
      res.status(422).json({ message: "Error deleting pogs" });
    }
  });

pogsRouter.param(
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

export default pogsRouter;
