import request from "./requestInstance";
import { parseSecurityToken, parseSecureNumbers } from "./utils";
import { postUsernameDob, postSecureNumbers } from "./authentication";
import { AccountsCollection } from "./AccountsCollection";
import { clearCookieJar } from "./requestInstance";
// import { postSecureNumbers } from "./authentication/postSecureNumbers";
interface Credentials {
  username: string;
  password: string;
  dateOfBirth: string;
  secureNumber: string;
}
export default class HL {
  /**
   * @param {Object} credentials This is a credentials object used to authenticate the HL instance.
   * @param {string} credentials.username Your Hargreaves Lansdown username
   * @param {string} credentials.password Your Hargreaves Lansdown password
   * @param {string} credentials.dateOfBirth The date of birth associated with your HL account
   * @param {string} credentials.secureNumber The secure number associated with your HL account
   */
  async authenticate({
    username,
    password,
    dateOfBirth,
    secureNumber,
  }: Credentials) {
    let stageOneHtml = (
      await request.get("https://online.hl.co.uk/my-accounts/login-step-one")
    ).body;

    const hl_vt = parseSecurityToken(stageOneHtml);

    await postUsernameDob(hl_vt, username, dateOfBirth);

    let stageTwoHtml = (
      await request.get("https://online.hl.co.uk/my-accounts/login-step-two")
    ).body;

    const secureNumbers = parseSecureNumbers(stageTwoHtml);
    await postSecureNumbers(hl_vt, password, secureNumbers, secureNumber);
  }

  async getInDepth() {
    return AccountsCollection.get();
  }

  async logout() {
    await clearCookieJar();
  }
}
