import { Encryptor } from "../../../server/controllers/RegisterController"

export default class EncryptorSpy implements Encryptor {
  passwordToEncrypt?: string
  toThrow?: Error
  hashedPassword?: string

  crypt(password: string): Error | string {
    this.passwordToEncrypt = password
    if (this.toThrow) {
      return this.toThrow
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