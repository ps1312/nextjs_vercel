import RegisterController from "../../server/controllers/RegisterController";
import InternalServerError from "../../server/errors/InternalServerError";
import EncryptorSpy from "./helpers/EncryptorSpy";
import UserStoreSpy from "./helpers/UserStoreSpy";

describe("RegisterController.ts", () => {
  it('should call encryptor with provided password', () => {
    const [sut, encryptor] = makeSUT();

    const body = makeBody()
    sut.process(makeBody())

    expect(encryptor.passwordToEncrypt).toEqual(body['password'])
  })

  it('should return INTERNAL SERVER ERROR status and InternalServerError on password encryption failure', () => {
    const [sut, encryptor] = makeSUT();
    encryptor.completeWith(anyError())

    expectError(sut, makeBody(), new InternalServerError(), 500)
  })

  it('should call userStore with provided email and encrypted password', () => {
    const [sut, encryptor, store] = makeSUT();
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

  it('should return INTERNAL SERVER ERROR status and InternalServerError on user store failure', () => {
    const [sut, _e, store] = makeSUT();
    store.completeWith(anyError())

    expectError(sut, makeBody(), new InternalServerError(), 500)
  })

  it('should return SUCCESS status and newly created user on happy path', () => {
    const [sut, _e, store] = makeSUT();
    const body = makeBody()
    const expectedUser = {
      id: 1,
      email: body.email,
    }
    store.completeWithSuccess(expectedUser)

    const result = sut.process(body)
    expect(result?.statusCode).toEqual(201)
    expect(result?.body).toStrictEqual(expectedUser)
  })

  function makeSUT(): [sut: RegisterController, encryptor: EncryptorSpy, store: UserStoreSpy] {
    const encryptor = new EncryptorSpy()
    const store = new UserStoreSpy()
    const sut = new RegisterController(encryptor, store);

    return [sut, encryptor, store]
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
