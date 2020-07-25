import { parseSecureNumbers } from "../utils/parseSecureNumbers";
import { stageTwoMockHTML } from "./__mocks__/stage-two-login-mock-html";

describe("Parsing secure numbers", () => {
  it("parses correct secure number based on HTML", () => {
    const secureNumbers = parseSecureNumbers(stageTwoMockHTML);
    expect(secureNumbers).toStrictEqual([0, 1, 4]);
  });

  it("throws an error if secure numbers cannot be parsed", async () => {
    expect(() =>
      parseSecureNumbers("HTML-Without-Secure-Numbers")
    ).toThrowError(new Error("Unable to parse secure numbers"));
  });
});
