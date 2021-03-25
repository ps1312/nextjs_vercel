export class MissingParamError implements Error {
  name: string = "MissingParamError";
  message: string;

  constructor(message: string) {
    this.message = message
  }
}

export class InvalidEmailError implements Error {
  name: string = "InvalidEmailError";
  message: string = "Invalid email provided";
}

class RegisterController {
  process(body: any): RegisterController.Result {
    const requiredParams = ['email', 'password', 'passwordConfirmation']
    let missingParams: string[] = [];
    requiredParams.forEach((p) => {
      if (!body[p]) missingParams.push(p)
    })

    if (missingParams.length > 0) {
      return {
        statusCode: 400,
        error: new MissingParamError(missingParams.join(', ')),
      };
    }

    return {
      statusCode: 400,
      error: new InvalidEmailError(),
    };
  }
}

module RegisterController {
  export type Result = { statusCode: number; error: Error };
}

export default RegisterController;
