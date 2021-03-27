import RegisterController from "../../server/controllers/RegisterController";
import InternalServerError from "../../server/errors/InternalServerError";
import EncryptorSpy from "./helpers/EncryptorSpy";
import UserStoreSpy from "./helpers/UserStoreSpy";
import ValidationSpy from "./helpers/ValidationSpy";

describe("RegisterController.ts", () => {
  it('should call validation with provided body', () => {
    const [sut, validation] = makeSUT();

    const body = makeBody()
    sut.process(body)

    expect(validation.bodyToValidate).toStrictEqual(body)
  })

  it("should return BAD REQUEST on validation error", () => {
    const [sut, validation] = makeSUT();
    const expectedError = anyError()
    validation.completeWith(expectedError)

    expectError(sut, makeBody(), expectedError, 400)
  });

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

  it('should call userStore with provided email and encrypted password', () => {
    const [sut, _, encryptor, store] = makeSUT();
    const body = makeBody()
    const hashedPassword = 'any-hashed-password'
    encryptor.completeWithSuccess(hashedPassword)

    sut.process(makeBody())

    const expectedUser = {
      email: body['email'],
      password: hashedPassword,
    }
    expect(store.userToStore).toStrictEqual(expectedUser)
  })

  function makeSUT(): [sut: RegisterController, validation: ValidationSpy, encryptor: EncryptorSpy, store: UserStoreSpy] {
    const validation = new ValidationSpy()
    const encryptor = new EncryptorSpy()
    const store = new UserStoreSpy()
    const sut = new RegisterController(validation, encryptor, store);

    return [sut, validation, encryptor, store]
  }


  function expectError(sut: RegisterController, body: any, error: Error, statusCode: number) {
    const result = sut.process(body) as RegisterController.Result;
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
