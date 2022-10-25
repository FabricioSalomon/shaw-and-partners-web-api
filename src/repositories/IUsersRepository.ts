import { User } from "../model/Users";

export interface IUsersRepository {
  findAll(id: number): Promise<User[]>;
}