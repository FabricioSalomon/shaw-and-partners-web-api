import { UserRepository } from "../../model/UserRepositories";
import { User, UserDetail } from "../../model/Users";
import { UsersRepository } from "../../repositories/UsersRepository";
import { api } from "../../services/api";

describe("UsersRepository", () => {
  const usersRepo = new UsersRepository();
  const usersData: User[] = require("../fixtures/users.json");
  const userDetailsData: UserDetail = require("../fixtures/userDetails.json");
  const userReposData: UserRepository[] = require("../fixtures/userRepositories.json");

  describe("findAll", () => {
    it("should return 2 users starting from id 0", async () => {
      jest.spyOn(api, "get").mockResolvedValue({ data: usersData });

      const users = await usersRepo.findAll();

      expect(users).toHaveLength(2);
      expect(users).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            login: "john",
            id: 1,
            node_id: "MDQ6VXNlheQ3",
          }),
          expect.objectContaining({
            login: "doe",
            id: 2,
            node_id: "MDQ6VXNlcjQ4",
          }),
        ])
      );
    });

    it("should return no users starting from id 2", async () => {
      jest.spyOn(api, "get").mockResolvedValue({ data: [] });

      const users = await usersRepo.findAll(2);

      expect(users).toHaveLength(0);
      expect(users).toStrictEqual([]);
    });
  });

  describe("findOne", () => {
    it("should return user detail for specific username", async () => {
      jest.spyOn(api, "get").mockResolvedValue({ data: userDetailsData });

      const userDeatils = await usersRepo.findOne("johndoe");

      expect(userDeatils).toStrictEqual(
        expect.objectContaining({
          login: "john",
          id: 1,
          node_id: "MDQ6VXNlheQ3",
          name: "John Doe",
        })
      );
    });
  });

  describe("findRepositories", () => {
    it("should return user repositories for specific username", async () => {
      jest.spyOn(api, "get").mockResolvedValue({ data: userReposData });

      const userRepos = await usersRepo.findRepositories("johndoe");

      expect(userRepos).toHaveLength(2);
      expect(userRepos).toStrictEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 551647307,
            node_id: "R_kgDOIOF4Sw",
            name: "test",
            full_name: "JohnDoe/test",
            private: false,
          }),
          expect.objectContaining({
            id: 513489291,
            node_id: "R_kgDOHpr5iw",
            name: "test",
            full_name: "JohnDoe/test",
            private: false,
          }),
        ])
      );
    });
  });
});
