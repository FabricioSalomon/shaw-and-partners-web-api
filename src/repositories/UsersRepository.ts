import { UserRepository } from "../model/Repositories";
import { User, UserDetail } from "../model/Users";
import { api } from "../services/api";
import { IUsersRepository } from "./IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async findAll(id = 0) {
    const users = await api.get<User[]>(`/users?since=${id}`);
    return users.data;
  }

  async findOne(username: string) {
    const user = await api.get<UserDetail>(`/users/${username}`);
    return user.data;
  }

  async findRepositories(username: string) {
    const user = await api.get<UserRepository[]>(`/users/${username}/repos`);
    return user.data;
  }
}
