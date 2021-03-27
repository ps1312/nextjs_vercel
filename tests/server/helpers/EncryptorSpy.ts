import { Encryptor } from "../../../server/controllers/RegisterController"
import InternalServerError from "../../../server/errors/InternalServerError"

export default class EncryptorSpy implements Encryptor {
  passwordToEncrypt?: string
  toThrow?: Error
  hashedPassword?: string

  crypt(password: string): string {
    this.passwordToEncrypt = password
    if (this.toThrow) {
      throw new InternalServerError()
    } else {
      return this.hashedPassword!
    }
  }

  completeWith(error: Error) {
    this.toThrow = error
  }

  completeWithSuccess(hashedPassword: string) {
    this.hashedPassword = hashedPassword
  }
}