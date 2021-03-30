import MissingParamError from "../errors/MissingParamsError";

export default class MissingParamsValidator {
  static validate(body: any, requiredParams: string[]): Error | undefined {
    let missingParams: string[] = [];

    const addOnPresentParam = (p: string) => !body[p] && missingParams.push(p)
    requiredParams.forEach(addOnPresentParam)

    if (missingParams.length > 0) {
      return new MissingParamError(missingParams.join(', '))
    }
  }
}