import { User } from "../model/Users";

export interface IUsersRepository {
  getUsers(id: number): Promise<User[]>;
}