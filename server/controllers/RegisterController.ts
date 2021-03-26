import InternalServerError from "../errors/InternalServerError";
import InvalidEmailError from "../errors/InvalidEmailError";
import MissingParamsValidator from "../validators/MissingParamsValidator";
import Validation from "../validators/Validation";

export interface Encryptor {
  crypt: (password: string) => void
}

class RegisterController {
  constructor(
    private readonly validation: Validation,
    private readonly encryptor: Encryptor,
  ) { }

  process(body: any): RegisterController.Result {
    try {
      this.validation.validate()
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
