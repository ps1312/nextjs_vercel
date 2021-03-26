export default class InvalidEmailError implements Error {
  name: string = "InvalidEmailError";
  message: string = "Invalid email provided";
}