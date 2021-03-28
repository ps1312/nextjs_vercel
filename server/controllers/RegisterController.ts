import InternalServerError from "../errors/InternalServerError";
import Validation from "../validators/Validation";

export interface Encryptor {
  crypt: (password: string) => Error | string
}

export interface UserStore {
  save: (user: { email: string, password: string }) => Error | { id: number, email: string }
}

class RegisterController {
  constructor(
    private readonly validation: Validation,
    private readonly encryptor: Encryptor,
    private readonly store: UserStore,
  ) { }

  process(body: any): RegisterController.Result {
    const validationError = this.validation.validate(body)
    if (validationError) {
      return { statusCode: 400, error: validationError };
    }

    const hashedPassword = this.encryptor.crypt(body['password'])
    if (hashedPassword instanceof Error) {
      return { statusCode: 500, error: new InternalServerError() };
    }

    const user = this.store.save({ email: body['email'], password: hashedPassword })
    if (user instanceof Error) {
      return { statusCode: 500, error: new InternalServerError() };
    }

    return { statusCode: 201, body: user }
  }
}

module RegisterController {
  export type Result = { statusCode: number; error?: Error, body?: any };
}

export default RegisterController;
