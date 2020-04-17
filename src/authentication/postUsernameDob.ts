import request from "../requestInstance";

export const postUsernameDob = async (hl_vt:string, username:string, dateOfBirth:string) => {
  request.post("https://online.hl.co.uk/my-accounts/login-step-one", {
    form: {
      hl_vt: hl_vt,
      username: username,
      "date-of-birth": dateOfBirth
    },
    followRedirect: false
  });
};
