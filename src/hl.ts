import getToken from "./getToken";
import postUserAndDob from "./postUserAndDob";
import postSecureNumberAndPass from "./postSecureNumberAndPass";
import getSpecifiedSecureNumbers from "./getSpecifiedSecureNumbers";
import getAccountsInfo from './getAccountsInfo';
import * as request from 'request'

export class hl {
    private username: string;
    private password: string;
    private secureNumber: string;
    private dateOfBirth: string;
    private hl_vt: Promise<string>
    private cookies: request.CookieJar


    private get specifiedSecureNumbers() {
        return getSpecifiedSecureNumbers(this.secureNumber, this.cookies)
    }

    constructor(username: string, password: string, secureNumber: string, dateOfBirth: string) {
        this.username = username;
        this.password = password;
        this.secureNumber = secureNumber
        this.dateOfBirth = dateOfBirth
        this.cookies = request.jar()
        this.hl_vt = getToken(this.cookies)
    }

    private async auth() {
        await postUserAndDob(this.username, this.hl_vt, this.dateOfBirth, this.cookies)
        await postSecureNumberAndPass(this.password, this.specifiedSecureNumbers, this.hl_vt, this.cookies)
    }

    async getAccountsInfo() {
        await this.auth()
        return await getAccountsInfo(this.cookies)
    }
}
