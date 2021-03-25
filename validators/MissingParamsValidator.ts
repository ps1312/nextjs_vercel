export class MissingParamError implements Error {
  name: string = "MissingParamError";
  message: string;

  constructor(message: string) {
    this.message = "Missing params: " + message
  }
}

export default class MissingParamsValidator {
  static validate(body: any, requiredParams: string[]) {
    let missingParams: string[] = [];

    const addOnPresentParam = (p: string) => !body[p] && missingParams.push(p)
    requiredParams.forEach(addOnPresentParam)

    if (missingParams.length > 0) {
      throw new MissingParamError(missingParams.join(', '))
    }
  }
}