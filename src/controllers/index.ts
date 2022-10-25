import { UsersRepository } from "../repositories/UsersRepository";
import { UsersService } from "../services/users.services";
import { UsersController } from "./users.controller";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
export const usersController = new UsersController(usersService);
