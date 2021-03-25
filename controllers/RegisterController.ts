class RegisterController {
  process(body: any): RegisterController.Result {
    if (!body.email) {
      return { statusCode: 400, body: "Missing parameters: Email" };
    }

    return { statusCode: 400, body: "Missing parameters: Password" };
  }
}

module RegisterController {
  export type Result = { statusCode: number; body: string }
}

export default RegisterController