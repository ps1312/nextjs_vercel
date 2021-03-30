import RegisterController, { SaveUserModel } from "../../server/controllers/RegisterController";
import InternalServerError from "../../server/errors/InternalServerError";
import UserStoreSpy from "./helpers/UserStoreSpy";
import ValidationSpy from "./helpers/ValidationSpy";

describe("RegisterController.ts", () => {
  it('should return BAD REQUEST o validation error', () => {
    const [sut, validation] = makeSUT();
    const expectedError = new Error()
    jest.spyOn(validation, 'validate').mockReturnValueOnce(expectedError)

    const result = sut.process(makeSaveUserModel())

    expect(result.statusCode).toEqual(400)
    expect(result.error).toStrictEqual(expectedError)
  })

  it('should call userStore with provided email and password', () => {
    const [sut, _v, store] = makeSUT();
    const saveUserModel = makeSaveUserModel()

    sut.process(saveUserModel)

    expect(store.userToStore).toStrictEqual(saveUserModel)
  })

  it('should return INTERNAL SERVER ERROR status and InternalServerError on user store failure', () => {
    const [sut, _v, store] = makeSUT();
    store.completeWith(anyError())

    const result = sut.process(makeSaveUserModel())

    expect(result.statusCode).toEqual(500)
    expect(result.error).toStrictEqual(new InternalServerError())
  })

  it('should return SUCCESS status and newly created user on save success', () => {
    const [sut, _v, store] = makeSUT();
    const body = makeSaveUserModel()
    const saveUserStub = { id: 1, email: body.email }
    store.completeWithSuccess(saveUserStub)

    const result = sut.process(body)

    expect(result.statusCode).toEqual(201)
    expect(result.body).toStrictEqual(saveUserStub)
  })

  function makeSUT(): [sut: RegisterController, validation: ValidationSpy, store: UserStoreSpy] {
    const validation = new ValidationSpy()
    const store = new UserStoreSpy()
    const sut = new RegisterController(validation, store);

    return [sut, validation, store]
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
