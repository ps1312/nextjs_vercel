import RegisterController, { InvalidEmailError } from "../controllers/RegisterController";
import { MissingParamError } from "../validators/MissingParamsValidator";

describe("RegisterController.ts", () => {
  it("should return BAD REQUEST status and a MissingParam error on missing params", () => {
    const sut = makeSUT();

    const missingEmailBody = makeBody({ email: undefined })
    expectError(sut, missingEmailBody, new MissingParamError('email'))

    const missingPasswordBody = makeBody({ password: undefined })
    expectError(sut, missingPasswordBody, new MissingParamError('password'))

    const missingPasswordConfirmation = makeBody({ passwordConfirmation: undefined })
    expectError(sut, missingPasswordConfirmation, new MissingParamError('passwordConfirmation'))

    const missingAllParamsBody = makeBody({ email: undefined, password: undefined, passwordConfirmation: undefined })
    expectError(sut, missingAllParamsBody, new MissingParamError('email, password, passwordConfirmation'))
  });

  it('should return BAD REQUEST status and a InvalidEmailError on invalid email', () => {
    const sut = makeSUT();

    const invalidEmailBody = makeBody({ email: 'invalid email' })
    expectError(sut, invalidEmailBody, new InvalidEmailError())
  })

  function makeSUT(): RegisterController {
    const sut = new RegisterController();
    return sut
  }

  function expectError(sut: RegisterController, body: any, error: Error) {
    const result = sut.process(body);
    expect(result.statusCode).toEqual(400);
    expect(result.error).toStrictEqual(error);
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
