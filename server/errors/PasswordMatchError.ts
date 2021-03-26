export default class PasswordMatchError implements Error {
  name: string = "PasswordMatchError";
  message: string = "Passwords don't match";
}