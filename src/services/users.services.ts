import { UsersRespository } from "../repositories/UsersRespository";

export class UsersService {
  constructor(private usersRepository: UsersRespository) {}

  async getUsers(id = 0) {
    const users = await this.usersRepository.getUsers(id);

    if (!users || users.length === 0) {
      throw new Error("Error getting users.");
    }

    return users;
  }
}
