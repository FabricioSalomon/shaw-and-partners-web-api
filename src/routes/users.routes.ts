import { Router } from "express";
import { usersController } from "../controllers";

export const usersRoutes = Router();

usersRoutes.get("/users", async (request, response) => {
  await usersController.getUsers(request, response);
});

usersRoutes.get("/users/:username/details", async (request, response) => {
  await usersController.getUserDetails(request, response);
});

usersRoutes.get("/users/:username/repos", async (request, response) => {
  await usersController.getUserRepositories(request, response);
});
