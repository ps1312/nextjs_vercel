import { UserStore } from "../../../server/controllers/RegisterController";
import InternalServerError from "../../../server/errors/InternalServerError";

export default class UserStorySpy implements UserStore {
  userToStore?: { email: string, password: string }
  toThrow?: Error

  save(user: { email: string; password: string; }): Error | undefined {
    this.userToStore = user
    if (this.toThrow) {
      return this.toThrow
    }
  };

  completeWith(error: Error) {
    this.toThrow = error
  }
}