import InternalServerError from "../errors/InternalServerError"
import Validation from "../validators/Validation";

export interface Encryptor {
  crypt: (password: string) => Error | string
}

export type SaveUserModel = {
  email: string;
  password: string;
}

type UserModel = {
  id: number;
  email: string;
}

export interface UserStore {
  save: (user: SaveUserModel) => UserModel | Error
}

class RegisterController {
  constructor(
    private readonly validation: Validation,
    private readonly store: UserStore,
  ) { }

  process(body: any): RegisterController.Result {
    const error = this.validation.validate(body)

    if (error) {
      return { statusCode: 400, error }
    }

    const saveUserModel: SaveUserModel = {
      email: body.email,
      password: body.password,
    }

    const user = this.store.save(saveUserModel)

    if (user instanceof Error) {
      return { statusCode: 500, error: new InternalServerError() };
    }

    return { statusCode: 201, body: user }
  }
}

module RegisterController {
  export type Result = {
    statusCode: number;
    error?: Error;
    body?: UserModel;
  };
}

export default RegisterController;
