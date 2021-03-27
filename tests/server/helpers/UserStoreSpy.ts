import { UserStore } from "../../../server/controllers/RegisterController";

export default class UserStorySpy implements UserStore {
  userToStore?: { email: string, password: string }

  save(user: { email: string; password: string; }) {
    this.userToStore = user
  };
}