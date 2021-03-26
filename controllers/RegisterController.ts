import MissingParamsValidator from "../validators/MissingParamsValidator";

export interface Encryptor {
  crypt: (password: string) => void
}

export class InvalidEmailError implements Error {
  name: string = "InvalidEmailError";
  message: string = "Invalid email provided";
}

export class InternalServerError implements Error {
  name: string = "InternalServerError";
  message: string = "Internal server error";
}

class RegisterController {
  constructor(
    private readonly encryptor: Encryptor,
  ) { }

  process(body: any): RegisterController.Result {
    try {
      const requiredParams = ['email', 'password', 'passwordConfirmation']
      MissingParamsValidator.validate(body, requiredParams)
      this.encryptor.crypt(body['password'])
      return { statusCode: 400, error: new InvalidEmailError() };
    } catch (error) {
      if (error instanceof InternalServerError) {
        return { statusCode: 500, error };
      }
      return { statusCode: 400, error };
    }
  }
}

module RegisterController {
  export type Result = { statusCode: number; error: Error };
}

export default RegisterController;
