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

  async getUserDetails(username: string) {
    const user = await this.usersRepository.findOne(username);

    if (!user?.id) {
      return new Error("Error getting user details.");
    }

    return user;
  }

  async getUserRepositories(username: string) {
    const userRepos = await this.usersRepository.findRepositories(username);

    if (!userRepos || userRepos.length === 0) {
      return new Error("Error getting user repositories.");
    }

    return userRepos;
  }
}
