import express from "express";
import { Request, Response, NextFunction } from "express";
const pogsRouter = express.Router();

pogsRouter.use(logger);

pogsRouter.get("/", (req: Request, res: Response) => {});

pogsRouter.get("/new", (req: Request, res: Response) => {});

pogsRouter.post("/", (req: Request, res: Response) => {});

pogsRouter
  .route("/:id")
  .get((req: Request, res: Response) => {
    // console.log(req: Request.user, "console");
  })
  .put((req: Request, res: Response) => {})
  .delete((req: Request, res: Response) => {});

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
