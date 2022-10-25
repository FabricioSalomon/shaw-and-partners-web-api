import { UserRepository } from "../model/UserRepositories";
import { User, UserDetail } from "../model/Users";

export interface IUsersRepository {
  findAll(id: number): Promise<User[]>;
  findOne(username: string): Promise<UserDetail>;
  findRepositories(username: string): Promise<UserRepository[]>;
}
