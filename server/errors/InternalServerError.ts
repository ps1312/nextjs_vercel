export default class InternalServerError implements Error {
  name: string = "InternalServerError";
  message: string = "Internal server error";
}