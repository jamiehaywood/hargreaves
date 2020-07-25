import request from "../requestInstance";
import { postSecureNumbers } from "../authentication/postSecureNumbers";

describe("POST secure numbers", () => {
  it("sends json body to correct url", async () => {
    const spy = jest.spyOn(request, "post");
    postSecureNumbers("111111", "password", [0, 3, 4], "123456");
    expect(spy).toHaveBeenCalledWith(
      "https://online.hl.co.uk/my-accounts/login-step-two",
      {
        followRedirect: false,
        form: {
          "online-password-verification": "password",
          hl_vt: "111111",
          "secure-number[1]": "1",
          "secure-number[2]": "4",
          "secure-number[3]": "5",
          submit: "Log+in",
        },
      }
    );
  });
});
