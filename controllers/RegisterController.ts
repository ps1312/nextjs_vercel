export class MissingParamError extends Error { }

class RegisterController {
  process(body: any): RegisterController.Result {
    const requiredParams = ['email', 'password', 'passwordConfirmation']
    let missingParams: string[] = [];
    requiredParams.forEach((p) => {
      if (!body[p]) missingParams.push(p)
    })

    return {
      statusCode: 400,
      error: new MissingParamError(missingParams.join(', ')),
    };
  }
}

module RegisterController {
  export type Result = { statusCode: number; error: Error };
}

export default RegisterController;
