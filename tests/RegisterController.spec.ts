import RegisterController, { MissingParamError } from "../controllers/RegisterController";

describe("RegisterController.ts", () => {
  it("should return BAD REQUEST status and a MissingParam error on missing email", () => {
    const sut = new RegisterController();

    const result = sut.process({});

    expectError(result, new MissingParamError('Email'))
  });

  it("should return BAD REQUEST status and a MissingParam error on missing password", () => {
    const sut = new RegisterController();

    const result = sut.process({ email: 'any-email@mail.com' });

    expectError(result, new MissingParamError('Password'))
  });

  it("should return BAD REQUEST status and a MissingParam error on missing passwordConfirmation", () => {
    const sut = new RegisterController();

    const result = sut.process({ email: 'any-email@mail.com', password: 'any password' });

    expectError(result, new MissingParamError('Password Confirmation'))
  });

  function expectError(result: RegisterController.Result, error: Error) {
    expect(result.statusCode).toEqual(400);
    expect(result.error).toEqual(error);
  }
});

export { };
