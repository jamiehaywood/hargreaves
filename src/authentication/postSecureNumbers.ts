import request from "../requestInstance";

export const postSecureNumbers = async (
  hl_vt: string,
  password: string,
  secureNumbers: Array<number>,
  secureNumber: string
) => {
  let [secureNo1, secureNo2, secureNo3] = secureNumbers;
  await request.post("https://online.hl.co.uk/my-accounts/login-step-two", {
    form: {
      hl_vt: hl_vt,
      "online-password-verification": password,
      "secure-number[1]": secureNumber[secureNo1],
      "secure-number[2]": secureNumber[secureNo2],
      "secure-number[3]": secureNumber[secureNo3],
      submit: "Log+in"
    },
    followRedirect: false
  });
};
