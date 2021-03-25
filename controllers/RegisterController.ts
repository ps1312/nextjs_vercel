class RegisterController {
  process(body: any): RegisterController.Result {
    if (!body.email) {
      return { statusCode: 400, body: "Missing parameters: Email" };
    }

    if (!body.password) {
      return { statusCode: 400, body: "Missing parameters: Password" };
    }

    return {
      statusCode: 400,
      body: "Missing parameters: Password Confirmation",
    };
  }
}

module RegisterController {
  export type Result = { statusCode: number; body: string };
}

export default RegisterController;
