import request from "./requestInstance";
import { parseSecurityToken } from "./utils/parseSecurityToken";
import { postUsernameDob } from "./authentication/postUsernameDob";
import { parseSecureNumbers } from "./utils/parseSecureNumbers";
import { postSecureNumbers } from "./authentication/postSecureNumbers";
import { AccountsCollection } from "./AccountsCollection";
import { clearCookieJar } from "./requestInstance";
// import { postSecureNumbers } from "./authentication/postSecureNumbers";

export default class HL {
  
  /**
   * This method authenticates the HL class instance with Hargreaves Lansdown using credentials supplied
   * @param {string} username Hargreaves Lansdown username.
   * @param {string} password Hargreaves Lansdown password.
   * @param {string} dateOfBirth Date of Birth.
   * @param {string} secureNumber Hargreaves Lansdown secure number.
   */

  async authenticate(
    username: string,
    password: string,
    dateOfBirth: string,
    secureNumber: string
  ) {
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
