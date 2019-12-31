import * as request from 'request'
import * as cheerio from 'cheerio'

export default function getToken(cookies: request.CookieJar) {
    return new Promise<string>(async (res, rej) => {
        const options = {
            jar: cookies,
            json: true,
            method: "GET",
            url: "https://online.hl.co.uk/my-accounts/login-step-one"
        }

        request(options, (error, response, body) => {
            switch (response.statusCode) {
                case 200:
                    const $ = cheerio.load(body)
                    res($('input[name="hl_vt"]').val())
                    break;
                default:
                    rej("An error occurred.");
                    break;
            }
        });
    })
}