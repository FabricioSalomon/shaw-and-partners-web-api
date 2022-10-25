import { Request, Response } from "express";
import { UsersService } from "../services/users.services";

export class UsersController {
  constructor(private usersService: UsersService) {}

  async getUsers(request: Request, response: Response) {
    const id = request.query.id ? Number(request.query.id) : 0;
    const users = await this.usersService.getUsers(id);

    if (typeof users === "string") {
      return response
        .status(400)
        .json({ error: true, message: "Something went wrong" });
    }

    return response.status(200).json({ data: users });
  }
}
