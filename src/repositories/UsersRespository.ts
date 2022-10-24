import { User } from "../model/Users";
import { api } from "../services/api";
import { IUsersRespository } from "./IUsersRepository";

export class UsersRespository implements IUsersRespository {
  async getUsers(id: number) {
    const users = await api.get<User[]>(`/users?since=${id}`);
    return users.data;
  }
}
