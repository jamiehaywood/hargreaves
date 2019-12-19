import * as request from 'request'
import * as cheerio from 'cheerio'

export default function getCashBalance(cookies: request.CookieJar) {
    return new Promise<string>(async (res, rej) => {
        const options = {
            jar: cookies,
            json: true,
            method: "GET",
            url: "https://online.hl.co.uk/my-accounts"
        }

        request(options, (error, response, body) => {
            switch (response.statusCode) {
                case 200:
                    const $ = cheerio.load(body)
                    res($('#content-body-full > div.landing-page > div.main-content > table > tfoot > tr > td:nth-child(3)').text().trim())
                default:
                    rej("An error occurred.");
                    break;
            }
        });
    })
}
