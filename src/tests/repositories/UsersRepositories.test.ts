import { User } from "../../model/Users";
import { UsersRepository } from "../../repositories/UsersRepository";
import { api } from "../../services/api";

describe("UsersRepository", () => {
  const usersRepo = new UsersRepository();
  const usersData: User[] = require("../fixtures/users");

  describe("findAll", () => {
    it("should return 2 users starting from id 0", async () => {
      jest.spyOn(api, "get").mockResolvedValue({ data: usersData });

      const users = await usersRepo.findAll();

      expect(users).toHaveLength(2);
      expect(users).toBe(usersData);
    });

    it("should return no users starting from id 2", async () => {
      jest.spyOn(api, "get").mockResolvedValue({ data: [] });

      const users = await usersRepo.findAll(2);

      expect(users).toHaveLength(0);
      expect(users).toStrictEqual([]);
    });
  });
});
