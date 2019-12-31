import * as request from 'request'

export default async function postUserAndDob(username: string, hl_vt: Promise<string>, dateOfBirth: string, cookies: request.CookieJar) {
    return new Promise<number>(async (res, rej) => {
        const options = {
            jar: cookies,
            json: true,
            method: "POST",
            url: "https://online.hl.co.uk/my-accounts/login-step-one",
            form: {
                hl_vt: await hl_vt,
                username: username,
                'date-of-birth': dateOfBirth
            }
        }

        request(options, (error, response, body) => {
            res(response.statusCode)
        })
    })
}