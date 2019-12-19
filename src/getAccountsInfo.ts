import * as request from 'request'
import accountInfoParser from './accountInfoParser'

export default function getAccountsInfo(cookies: request.CookieJar) {
    return new Promise<object>(async (res, rej) => {
        const options = {
            jar: cookies,
            json: true,
            method: "GET",
            url: "https://online.hl.co.uk/my-accounts"
        }

        request(options, (error, response, body) => {
            switch (response.statusCode) {
                case 200:
                    let accountInfo = accountInfoParser(body)
                    res(accountInfo)
                    break;
                default:
                    rej("An error occurred.");
                    break;
            }
        });
    })
}
