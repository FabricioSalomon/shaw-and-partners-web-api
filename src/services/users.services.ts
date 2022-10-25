import { User } from "../model/Users";
import { UsersRepository } from "../repositories/UsersRepository";

export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async getUsers(id = 0): Promise<User[] | Error> {
    const users = await this.usersRepository.findAll(id);

    if (!users || users.length === 0) {
      return new Error("Error getting users.");
    }

    return users;
  }
}
