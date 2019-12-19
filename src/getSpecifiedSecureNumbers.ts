import * as request from 'request'
import * as cheerio from 'cheerio'

export default async function getSpecifiedSecureNumbers(secureNumber: string, cookies: request.CookieJar) {
    return new Promise<String[]>(async (res, rej) => {
        const options = {
            jar: cookies,
            json: true,
            method: "GET",
            url: "https://online.hl.co.uk/my-accounts/login-step-two"
        }

        request(options, (error, response, body) => {
            switch (response.statusCode) {
                case 200:
                    let array = secureNumber.split("")
                    const $ = cheerio.load(body)
                    let s1 = parseInt($('input[id="secure-number-1"]').attr('title')!.match(/[0-9]/g)![0]) - 1
                    let s2 = parseInt($('input[id="secure-number-2"]').attr('title')!.match(/[0-9]/g)![0]) - 1
                    let s3 = parseInt($('input[id="secure-number-3"]').attr('title')!.match(/[0-9]/g)![0]) - 1
                    let secureNumberPositions = []
                    secureNumberPositions.push(array[s1])
                    secureNumberPositions.push(array[s2])
                    secureNumberPositions.push(array[s3])
                    res(secureNumberPositions)
                    break;
                default:
                    rej("An error occurred.");
                    break;
            }
        });
    })
}