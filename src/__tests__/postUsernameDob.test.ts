import request from "../requestInstance";
import { postUsernameDob } from "../authentication/postUsernameDob";
describe("POST Username and Date of Birth", () => {
  it("sends json body to correct url", async () => {
    const spy = jest.spyOn(request, "post");
    postUsernameDob("12345", "testUsername", "010101");

    expect(spy).toHaveBeenCalledWith(
      "https://online.hl.co.uk/my-accounts/login-step-one",
      {
        followRedirect: false,
        form: {
          "date-of-birth": "010101",
          hl_vt: "12345",
          username: "testUsername",
        },
      }
    );
  });

  it("throws error if response returns a page with `try again` in it", async () => {
    request.post = jest.fn().mockResolvedValue({ body: "try again" });
    await expect(
      postUsernameDob("12345", "testUsername", "010101")
    ).rejects.toThrowError();
  });

  it("resolves promise if response does not return `try again` ", async () => {
    request.post = jest.fn().mockResolvedValue({ body: "success" });
    expect(postUsernameDob("12345", "testUsername", "010101")).resolves;
  });
});
