import Validation from "../../../server/validators/Validation"

export default class ValidationSpy implements Validation {
  bodyToValidate: any
  toThrow?: Error

  validate(body: any): Error | undefined {
    this.bodyToValidate = body
    if (this.toThrow) {
      return this.toThrow
    }
  }

  completeWith(error: Error) {
    this.toThrow = error
  }
}