class RegisterController {
  process(): { statusCode: number, body: string } {
    return { statusCode: 400, body: "Missing parameters: Email" }
  }
}

describe('RegisterController.ts', () => {
  it('should return BAD REQUEST status and a message on missing email', () => {
    const sut = new RegisterController()

    const result = sut.process()

    expect(result.statusCode).toEqual(400)
    expect(result.body).toEqual("Missing parameters: Email")
  })
})

export { }