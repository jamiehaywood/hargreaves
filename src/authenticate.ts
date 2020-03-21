import request from "./requestInstance";

export default async function authenticate(username: string, password: string, dateOfBirth: string, secureNumber: string) {
    // get hl_vt token
    const hl_vt = cheerio.load((await request.get("https://online.hl.co.uk/my-accounts/login-step-one")).body)('input[name="hl_vt"]').val()

    // Post username, DoB, and hl_vt token
    await (request.post('https://online.hl.co.uk/my-accounts/login-step-one', {
        form: {
            'hl_vt': hl_vt,
            'username': username,
            'date-of-birth': dateOfBirth
        },
        followRedirect: false
    }));


    let response = await request.get('https://online.hl.co.uk/my-accounts/login-step-two', { followRedirect: true })

    // Get the specified secure numbers
    const $ = cheerio.load(response.body)

    let secureNumbers = [
        parseInt($('#secure-number-1').attr('title')?.match(/[0-9]/g)![0]) - 1,
        parseInt($('#secure-number-2').attr('title')?.match(/[0-9]/g)![0]) - 1,
        parseInt($('#secure-number-3').attr('title')?.match(/[0-9]/g)![0]) - 1
    ]

    // Post the secure numbers
    await request.post('https://online.hl.co.uk/my-accounts/login-step-two', {
        form: {
            hl_vt: hl_vt,
            'online-password-verification': password,
            'secure-number[1]': secureNumber![secureNumbers[0]],
            'secure-number[2]': secureNumber![secureNumbers[1]],
            'secure-number[3]': secureNumber![secureNumbers[2]],
            submit: 'Log+in'
        },
        followRedirect: false
    })
}