import { UserStore, SaveUserModel } from "../controllers/RegisterController";

export default class InMemoryUserStore implements UserStore {
  users: any[] = [];

  save(user: SaveUserModel): { id: number; email: string } | Error {
    const newUser = {
      id: this.users.length + 1,
      email: user.email,
      password: user.password,
    };

    this.users.push(newUser);

    return newUser;
  }
}