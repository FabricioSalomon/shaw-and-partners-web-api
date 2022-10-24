import { Router } from "express";
import { usersController } from "../controllers";

export const usersRoutes = Router();

usersRoutes.get("/users", async (request, response) => {
  await usersController.getUsers(request, response);
});
