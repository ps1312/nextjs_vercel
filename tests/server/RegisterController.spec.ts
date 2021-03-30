import RegisterController, { SaveUserModel } from "../../server/controllers/RegisterController";
import InternalServerError from "../../server/errors/InternalServerError";
import UserStoreSpy from "./helpers/UserStoreSpy";

describe("RegisterController.ts", () => {
  it('should call userStore with provided email and password', () => {
    const [sut, store] = makeSUT();
    const saveUserModel = makeSaveUserModel()

    sut.process(saveUserModel)

    expect(store.userToStore).toStrictEqual(saveUserModel)
  })

  it('should return INTERNAL SERVER ERROR status and InternalServerError on user store failure', () => {
    const [sut, store] = makeSUT();
    store.completeWith(anyError())

    const result = sut.process(makeSaveUserModel())

    expect(result.statusCode).toEqual(500)
    expect(result.error).toStrictEqual(new InternalServerError())
  })

  it('should return SUCCESS status and newly created user on save success', () => {
    const [sut, store] = makeSUT();
    const body = makeSaveUserModel()
    const saveUserStub = { id: 1, email: body.email }
    store.completeWithSuccess(saveUserStub)

    const result = sut.process(body)

    expect(result.statusCode).toEqual(201)
    expect(result.body).toStrictEqual(saveUserStub)
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

  function makeSaveUserModel(overrides: any = undefined): SaveUserModel {
    return {
      email: 'any-email@mail.com',
      password: 'any password',
      ...overrides
    }
  }
});

export { };
