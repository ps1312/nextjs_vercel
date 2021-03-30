import InternalServerError from "../errors/InternalServerError"

export interface Encryptor {
  crypt: (password: string) => Error | string
}

type SaveUserModel = {
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

export type RegisterUserParams = {
  email: string;
  password: string;
  passwordConfirmation: string;
}

class RegisterController {
  constructor(
    private readonly store: UserStore,
  ) { }

  process(body: RegisterUserParams): RegisterController.Result {
    const { email, password, passwordConfirmation } = body

    if (password !== passwordConfirmation) {
      return { statusCode: 400, error: new InternalServerError() };
    }

    const saveUserModel = { email, password }
    const user = this.store.save(saveUserModel)
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
