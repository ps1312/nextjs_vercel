import { UserStore } from "../../../server/controllers/RegisterController";

export default class UserStorySpy implements UserStore {
  userToStore?: { email: string, password: string }
  toThrow?: Error
  storedUser?: { id: number, email: string; }

  save(user: { email: string; password: string; }): Error | { id: number, email: string } {
    this.userToStore = user
    if (this.toThrow) {
      return this.toThrow
    }

    return this.storedUser!
  };

  completeWith(error: Error) {
    this.toThrow = error
  }

  completeWithSuccess(user: { id: number, email: string; }) {
    this.storedUser = user
  }
}