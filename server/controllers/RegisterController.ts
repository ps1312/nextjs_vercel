import InternalServerError from "../errors/InternalServerError";
import Validation from "../validators/Validation";

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

type RegisterUserParams = {
  email: string;
  password: string;
}

class RegisterController {
  constructor(
    private readonly encryptor: Encryptor,
    private readonly store: UserStore,
  ) { }

  process(body: RegisterUserParams): RegisterController.Result {
    const { email, password } = body

    const hashedPassword = this.encryptor.crypt(password)
    if (hashedPassword instanceof Error) {
      return { statusCode: 500, error: new InternalServerError() };
    }

    const saveUserModel = { email, password: hashedPassword }

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
