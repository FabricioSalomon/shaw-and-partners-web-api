import { UserRepository } from "../../model/Repositories";
import { User, UserDetail } from "../../model/Users";
import { UsersRepository } from "../../repositories/UsersRepository";
import { api } from "../../services/api";
import { UsersService } from "../../services/users.services";

describe("UsersServices", () => {
  const usersRepo = new UsersRepository();
  const usersService = new UsersService(usersRepo);
  const usersData: User[] = require("../fixtures/users.json");
  const userDetailsData: UserDetail = require("../fixtures/userDetails.json");
  const userReposData: UserRepository[] = require("../fixtures/userRepositories.json");

  describe("getUsers", () => {
    it("should return 2 users starting from id 0", async () => {
      jest.spyOn(usersRepo, "findAll").mockResolvedValue(usersData);

      const users = await usersService.getUsers();

      expect(usersRepo.findAll).toBeCalledTimes(1);
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

    it("should return error if no users are found", async () => {
      jest.spyOn(usersRepo, "findAll").mockResolvedValue([]);

      const users = await usersService.getUsers();
      expect(users).toStrictEqual(new Error("Error getting users."));
      expect(usersRepo.findAll).toBeCalledTimes(1);
    });
  });

  describe("getUserDetails", () => {
    it("should return user detail for specific username", async () => {
      jest.spyOn(usersRepo, "findOne").mockResolvedValue(userDetailsData);

      const userDeatils = await usersService.getUserDetails("johndoe");

      expect(usersRepo.findOne).toBeCalledTimes(1);
      expect(userDeatils).toStrictEqual(
        expect.objectContaining({
          login: "john",
          id: 1,
          node_id: "MDQ6VXNlheQ3",
          name: "John Doe",
        })
      );
    });

    it("should return error if no user details are found", async () => {
      jest.spyOn(usersRepo, "findOne").mockResolvedValue({} as UserDetail);

      const userDeatils = await usersService.getUserDetails("johndoe");
      expect(userDeatils).toStrictEqual(
        new Error("Error getting user details.")
      );
      expect(usersRepo.findOne).toBeCalledTimes(1);
    });
  });

  describe("getUserRepositories", () => {
    it("should return user repositories for specific username", async () => {
      jest
        .spyOn(usersRepo, "findRepositories")
        .mockResolvedValue(userReposData);

      const userRepos = await usersService.getUserRepositories("johndoe");

      expect(usersRepo.findRepositories).toBeCalledTimes(1);
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

    it("should return error if user no repositories are found", async () => {
      jest.spyOn(usersRepo, "findRepositories").mockResolvedValue([]);

      const userRepositories = await usersService.getUserRepositories(
        "johndoe"
      );
      expect(userRepositories).toStrictEqual(
        new Error("Error getting user repositories.")
      );
      expect(usersRepo.findRepositories).toBeCalledTimes(1);
    });
  });
});
