import RegisterController from "../controllers/RegisterController";

describe("RegisterController.ts", () => {
  it("should return BAD REQUEST status and a message on missing email", () => {
    const sut = new RegisterController();

    const result = sut.process({});

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual("Missing parameters: Email");
  });

  it("should return BAD REQUEST status and a message on missing password", () => {
    const sut = new RegisterController();

    const result = sut.process({ email: 'any-email@mail.com ' });

    expect(result.statusCode).toEqual(400);
    expect(result.body).toEqual("Missing parameters: Password");
  });
});

export { };
