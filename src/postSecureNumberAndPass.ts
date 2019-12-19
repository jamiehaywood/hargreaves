import * as request from 'request'

export default async function postSecureNumberAndPass(password: string, specifiedSecureNumbers: Promise<String[]>, hl_vt: Promise<string>, cookies: request.CookieJar) {
    return new Promise<number>(async (res, rej) => {
        let secureNumbers = await specifiedSecureNumbers
        const options = {
            jar: cookies,
            json: true,
            method: "POST",
            url: "https://online.hl.co.uk/my-accounts/login-step-two",
            form:
            {
                hl_vt: await hl_vt,
                'online-password-verification': password,
                'secure-number[1]': secureNumbers[0],
                'secure-number[2]': secureNumbers[1],
                'secure-number[3]': secureNumbers[2],
                submit: 'Log+in'
            }
        };

        request(options, (error, response, body) => {
            switch (response.statusCode) {
                case 302:
                    res(response.statusCode)
                    break;
                default:
                    rej("An error occurred.");
                    break;
            }
        });
    })
}