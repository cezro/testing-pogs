import express from "express";
import { validateAccessToken } from "../middleware/auth0.middleware";
import {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} from "./messages.service";

export const messagesRouter = express.Router();
console.log("messages");

messagesRouter.get("/public", (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get("/protected", validateAccessToken, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

messagesRouter.get("/admin", validateAccessToken, (req, res) => {
  const message = getAdminMessage();
  console.log("messages Adminnn");
  res.status(200).json(message);
});
