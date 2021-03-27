import Validation from "../../../server/validators/Validation"

export default class ValidationSpy implements Validation {
  bodyToValidate: any
  toThrow?: Error

  validate(body: any) {
    this.bodyToValidate = body
    if (this.toThrow) {
      throw this.toThrow
    }
  }

  completeWith(error: Error) {
    this.toThrow = error
  }
}