import { User } from "../model/Users";

export interface IUsersRespository {
  getUsers(id: number): Promise<User[]>;
}