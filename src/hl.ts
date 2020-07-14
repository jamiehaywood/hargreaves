import { postUserAndDob, postSecureNumberAndPass, getSpecifiedSecureNumbers, getToken } from './authentication';
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
        
        if (username == null || username == "") {
            throw new Error("Username not provided")
        }

        if (password == null || password == "") {
            throw new Error("Password not provided")
        }

        if (secureNumber == null || secureNumber == "") {
            throw new Error("SecureNumber not provided")
        }

        if (dateOfBirth == null || dateOfBirth == "") {
            throw new Error("DateOfBirth not provided")
        }
        
        this.username = username;
        this.password = password;
        this.secureNumber = secureNumber
        this.dateOfBirth = dateOfBirth
        this.cookies = request.jar()
        this.hl_vt = getToken(this.cookies)
    }

    private async auth() {
        this.cookies.setCookie("jsCheck=yes; path=/", ".hl.co.uk");
        await postUserAndDob(this.username, this.hl_vt, this.dateOfBirth, this.cookies)
        await postSecureNumberAndPass(this.password, this.specifiedSecureNumbers, this.hl_vt, this.cookies)
    }

    async getAccountsInfo() {
        await this.auth()
        return await getAccountsInfo(this.cookies)
    }
}
