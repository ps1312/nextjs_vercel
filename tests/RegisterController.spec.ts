import RegisterController, { Encryptor, InternalServerError, InvalidEmailError } from "../controllers/RegisterController";
import { MissingParamError } from "../validators/MissingParamsValidator";

describe("RegisterController.ts", () => {
  it("should return BAD REQUEST status and a MissingParam error on missing params", () => {
    const [sut] = makeSUT();

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
    const [sut] = makeSUT();

    const invalidEmailBody = makeBody({ email: 'invalid email' })
    expectError(sut, invalidEmailBody, new InvalidEmailError())
  })

  it('should return INTERNAL SERVER ERROR status and InternalServerError on password encryption failure', () => {
    const [sut, encryptor] = makeSUT();
    encryptor.toThrow = true

    const result = sut.process(makeBody())

    expect(result.statusCode).toEqual(500)
    expect(result.error).toEqual(new InternalServerError())
  })

  function makeSUT(): [sut: RegisterController, encryptor: EncryptorSpy] {
    const encryptor = new EncryptorSpy()
    const sut = new RegisterController(encryptor);
    return [sut, encryptor]
  }

  class EncryptorSpy implements Encryptor {
    toThrow: boolean = false

    crypt() {
      if (this.toThrow) {
        throw new InternalServerError()
      }
    }
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
