import MissingParamsValidator from "../validators/MissingParamsValidator";

export class InvalidEmailError implements Error {
  name: string = "InvalidEmailError";
  message: string = "Invalid email provided";
}

class RegisterController {
  process(body: any): RegisterController.Result {
    try {
      const requiredParams = ['email', 'password', 'passwordConfirmation']
      MissingParamsValidator.validate(body, requiredParams)
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
