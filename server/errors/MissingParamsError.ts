export default class MissingParamError implements Error {
  name: string = "MissingParamError";
  message: string;

  constructor(message: string) {
    this.message = "Missing params: " + message
  }
}
