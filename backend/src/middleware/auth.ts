import type { RequestHandler } from "express";

declare module "express-session" {
  interface SessionData {
    username: string;
  }
}

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.session?.username) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};
