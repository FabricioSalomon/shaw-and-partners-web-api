import { Request, Response } from "express";
import { UsersService } from "../services/users.services";

export class UsersController {
  constructor(private usersService: UsersService) {}

  async getUsers(request: Request, response: Response) {
    const id = request.query.since ? Number(request.query.since) : 0;
    const users = await this.usersService.getUsers(id);

    if (typeof users === "string") {
      return response
        .status(400)
        .json({ error: true, message: "Something went wrong" });
    }

    return response.status(200).json({ data: users });
  }

  async getUserDetails(request: Request, response: Response) {
    const username = request.params.username;
    const user = await this.usersService.getUserDetails(username);

    if (typeof user === "string") {
      return response
        .status(400)
        .json({ error: true, message: "Something went wrong" });
    }

    return response.status(200).json({ data: user });
  }

  async getUserRepositories(request: Request, response: Response) {
    const username = request.params.username;
    const userRepos = await this.usersService.getUserRepositories(username);

    if (typeof userRepos === "string") {
      return response
        .status(400)
        .json({ error: true, message: "Something went wrong" });
    }

    return response.status(200).json({ data: userRepos });
  }
}
