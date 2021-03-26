import { Encryptor } from "../../../server/controllers/RegisterController"
import InternalServerError from "../../../server/errors/InternalServerError"

export default class EncryptorSpy implements Encryptor {
  passwordToEncrypt?: string
  toThrow?: Error

  crypt(password: string) {
    this.passwordToEncrypt = password
    if (this.toThrow) {
      throw new InternalServerError()
    }
  }

  completeWith(error: Error) {
    this.toThrow = error
  }
}