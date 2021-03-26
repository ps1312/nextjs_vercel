import RegisterController, { Encryptor } from "../../server/controllers/RegisterController";
import InternalServerError from "../../server/errors/InternalServerError";
import InvalidEmailError from "../../server/errors/InvalidEmailError";
import MissingParamError from "../../server/errors/MissingParamsError";
import Validation from "../../server/validators/Validation";

describe("RegisterController.ts", () => {
  it('should call validation with provided body', () => {
    const [sut, validation] = makeSUT();

    const body = makeBody()
    sut.process(makeBody())

    expect(validation.bodyToValidate).toStrictEqual(body)
  })

  it("should return BAD REQUEST on MissingParamError validation error", () => {
    const [sut, validation] = makeSUT();
    const expectedError = new MissingParamError('email')
    validation.completeWith(expectedError)

    expectError(sut, makeBody(), expectedError, 400)
  });

  it('should return BAD REQUEST on InvalidEmailError validation error', () => {
    const [sut, validation] = makeSUT();
    const expectedError = new InvalidEmailError()
    validation.completeWith(expectedError)

    expectError(sut, makeBody(), expectedError, 400)
  })

  it('should call encryptor with provided password', () => {
    const [sut, _, encryptor] = makeSUT();

    const body = makeBody()
    sut.process(makeBody())

    expect(encryptor.passwordToEncrypt).toEqual(body['password'])
  })

  it('should return INTERNAL SERVER ERROR status and InternalServerError on password encryption failure', () => {
    const [sut, _, encryptor] = makeSUT();
    encryptor.completeWith(anyError())

    expectError(sut, makeBody(), new InternalServerError(), 500)
  })

  function makeSUT(): [sut: RegisterController, validation: RegisterControllerValidationSpy, encryptor: EncryptorSpy] {
    const validation = new RegisterControllerValidationSpy()
    const encryptor = new EncryptorSpy()
    const sut = new RegisterController(validation, encryptor);

    return [sut, validation, encryptor]
  }

  class RegisterControllerValidationSpy implements Validation {
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

  class EncryptorSpy implements Encryptor {
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

  function expectError(sut: RegisterController, body: any, error: Error, statusCode: number) {
    const result = sut.process(body);
    expect(result.statusCode).toEqual(statusCode);
    expect(result.error).toStrictEqual(error);
  }

  function anyError(): Error {
    return new Error()
  }

  function makeBody(overrides: any = undefined): any {
    return {
      email: 'any-email@mail.com',
      password: 'any password',
      passwordConfirmation: 'any password',
      ...overrides
    }
  }
});

export { };
