import { User } from "../../model/Users";
import { UsersRepository } from "../../repositories/UsersRepository";
import { api } from "../../services/api";
import { UsersService } from "../../services/users.services";

describe("UsersServices", () => {
  const usersRepo = new UsersRepository();
  const usersService = new UsersService(usersRepo);
  const usersData: User[] = require("../fixtures/users");

  describe("getUsers", () => {
    it("should return 2 users starting from id 0", async () => {
      jest.spyOn(usersRepo, "findAll").mockResolvedValue(usersData);

      const users = await usersService.getUsers();

      expect(usersRepo.findAll).toBeCalledTimes(1);
      expect(users).toHaveLength(2);
      expect(users).toBe(usersData);
    });

    it("should return error if no users are found", async () => {
      jest.spyOn(usersRepo, "findAll").mockResolvedValue([]);

      const users = await usersService.getUsers();
      expect(users).toStrictEqual(new Error("Error getting users."));
      expect(usersRepo.findAll).toBeCalledTimes(1);
    });
  });
});
