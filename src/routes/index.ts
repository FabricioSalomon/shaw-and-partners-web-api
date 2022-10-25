import { Router } from "express";
import { usersRoutes } from "./users.routes";

export const router = Router();

router.get("/health-check", (request, response) => {
  return response.status(200).json({ message: "OK" });
});

router.use(usersRoutes);
