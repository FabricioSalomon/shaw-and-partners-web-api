import { User } from "../model/Users";
import { api } from "../services/api";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async getUsers(id = 0) {
    const users = await api.get<User[]>(`/users?since=${id}`);
    return users.data;
  }
}
