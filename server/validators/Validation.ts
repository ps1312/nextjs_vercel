export default interface Validation {
  validate: (body: any) => Error | undefined
}