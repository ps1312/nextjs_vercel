export class MissingParamError extends Error { }

class RegisterController {
  process(body: any): RegisterController.Result {
    if (!body.email) {
      return { statusCode: 400, error: new MissingParamError('Email') };
    }

    if (!body.password) {
      return { statusCode: 400, error: new MissingParamError('Password') };
    }

    return { statusCode: 400, error: new MissingParamError('Password Confirmation') };
  }
}

module RegisterController {
  export type Result = { statusCode: number; error: Error };
}

export default RegisterController;
