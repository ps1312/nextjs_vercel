import InMemoryUserStore from "../../server/store/InMemoryUserStore";

describe("InMemoryUserStore.ts", () => {
  it("should save user in memory", () => {
    const sut = new InMemoryUserStore();
    const user = { email: "any-email@mail.com", password: "hashed_password" };

    sut.save(user);

    expect(sut.users.length).toEqual(1);
    expect(sut.users[0]).toStrictEqual({ id: 1, email: user.email, password: user.password });
  });
});

export default {};
