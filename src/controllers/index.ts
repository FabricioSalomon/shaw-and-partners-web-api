import { UsersRespository } from "../repositories/UsersRespository";
import { UsersService } from "../services/users.services";
import { UsersController } from "./users.controller";

const usersRespository = new UsersRespository();
const usersService = new UsersService(usersRespository);
export const usersController = new UsersController(usersService);
