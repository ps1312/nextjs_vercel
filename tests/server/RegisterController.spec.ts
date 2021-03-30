import RegisterController, { RegisterUserParams } from "../../server/controllers/RegisterController";
import InternalServerError from "../../server/errors/InternalServerError";
import UserStoreSpy from "./helpers/UserStoreSpy";

describe("RegisterController.ts", () => {
  it('should return BAD REQUEST when passwords do not match', () => {
    const [sut] = makeSUT()
    const nonMatchingPasswordBody = makeBody({ passwordConfirmation: 'another-password' })

    expectError(sut, nonMatchingPasswordBody, new InternalServerError(), 400)
  })

  it('should call userStore with provided email and password', () => {
    const [sut, store] = makeSUT();
    const body = makeBody()

    sut.process(makeBody())

    const expectedUser = {
      email: body['email'],
      password: body['password'],
    }
    expect(store.userToStore).toStrictEqual(expectedUser)
  })

  it('should return INTERNAL SERVER ERROR status and InternalServerError on user store failure', () => {
    const [sut, store] = makeSUT();
    store.completeWith(anyError())

    expectError(sut, makeBody(), new InternalServerError(), 500)
  })

  it('should return SUCCESS status and newly created user on happy path', () => {
    const [sut, store] = makeSUT();
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

  function makeSUT(): [sut: RegisterController, store: UserStoreSpy] {
    const store = new UserStoreSpy()
    const sut = new RegisterController(store);

    return [sut, store]
  }

  function expectError(sut: RegisterController, body: any, error: Error, statusCode: number) {
    const result = sut.process(body) as RegisterController.Result;
    expect(result.statusCode).toEqual(statusCode);
    expect(result.error).toStrictEqual(error);
  }

  function anyError(): Error {
    return new Error()
  }

  function makeBody(overrides: any = undefined): RegisterUserParams {
    return {
      email: 'any-email@mail.com',
      password: 'any password',
      passwordConfirmation: 'any password',
      ...overrides
    }
  }
});

export { };
