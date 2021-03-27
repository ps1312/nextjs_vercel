import InternalServerError from "../errors/InternalServerError";
import Validation from "../validators/Validation";

export interface Encryptor {
  crypt: (password: string) => string
}

export interface UserStore {
  save: (user: { email: string, password: string }) => void
}

class RegisterController {
  constructor(
    private readonly validation: Validation,
    private readonly encryptor: Encryptor,
    private readonly store: UserStore,
  ) { }

  process(body: any): RegisterController.Result | undefined {
    try {
      this.validation.validate(body)
      const hashedPassword = this.encryptor.crypt(body['password'])
      this.store.save({ email: body['email'], password: hashedPassword })
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
