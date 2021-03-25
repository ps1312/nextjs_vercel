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

class MissingParamsValidator {
  static validate(body: any): string[] {
    const requiredParams = ['email', 'password', 'passwordConfirmation']
    let missingParams: string[] = [];
    requiredParams.forEach((p) => {
      if (!body[p]) missingParams.push(p)
    })

    if (missingParams.length > 0) {
      throw new MissingParamError(missingParams.join(', '))
    }
    return missingParams
  }
}

class RegisterController {
  process(body: any): RegisterController.Result {
    try {
      MissingParamsValidator.validate(body)
      return { statusCode: 400, error: new InvalidEmailError() };
    } catch (error) {
      return { statusCode: 400, error };
    }
  }
}

module RegisterController {
  export type Result = { statusCode: number; error: Error };
}

export default RegisterController;
