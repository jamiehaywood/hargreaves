import request from './requestInstance'
import * as cheerio from 'cheerio'
import accountsOverview from './accountsOverview'
import { IAccounts, IAccount, IInvestments, IInvestment } from './interfaces'
import { IInvestmentDetails, ITransactions } from './interfaces'


export class hl {
    async authenticate(
        username: string,
        password: string,
        dateOfBirth: string,
        secureNumber: string
    ) {
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

    async getOverview() {
        let data = (await request.get('https://online.hl.co.uk/my-accounts')).body
        return accountsOverview(data)
    }

    async getInDepth() {
        return AccountsCollection.create('https://online.hl.co.uk/my-accounts')
    }
}

class AccountsCollection implements IAccounts {
    [index: string]: any

    // Factory method
    public static create = async (url: string) => {
        let data: string = (await request.get(url)).body

        // Creates an instance of itself
        const accountsCollection = new AccountsCollection()

        let $ = cheerio.load(data)
        let accounts = $('table[class="accounts-table"] tbody tr')
            .find('td:nth-child(1) a')
            .toArray()

        // For Of - allows async within
        for (const account of accounts) {
            accountsCollection[$(account).text().trim()] = await Account.getAccount($(account).attr('href'))
        }

        // Return the async created AccountsCollection
        return accountsCollection
    }
}

class Account implements IAccount {
    stockValue!: string
    cashValue!: string
    totalValue!: string
    totalGain!: string
    totalGainPercentage!: string
    available!: string
    holdings = {} as IInvestments
    public static getAccount = async (url?: string) => {
        if (!url) { return }
        let account = new Account()
        let data: string = (await request.get(url)).body
        let $ = cheerio.load(data)
        account.stockValue = $('#stock_total_header').text().trim()
        account.cashValue = $('#cash_total_header').text().trim()
        account.totalValue = $('#account_total_header').text().trim()
        account.totalGain = $('#gaingbp_total').text().trim()

        let investmentRow = $('#holdings-table > tbody > tr').toArray()
        for (const investmenthtml of investmentRow) {
            let investmentName = $('span[class="text-bold"]', investmenthtml).text().trim();
            let investmentUrl = $(investmenthtml).find('div > a.link-headline').attr('href')
            if (url) {
                let array = $(investmenthtml).find('td')
                    .toArray()
                    .map(element => $(element).text().trim().replace(/\n/g, ''))
                let investment: IInvestment = {
                    ticker: array[0],
                    unitsHeld: array[2],
                    cost: array[5],
                    price: array[3],
                    value: array[4],
                    gain: array[16],
                    gainPercentage: array[17],
                    stockType: '',
                    stockInfo: '',
                    stockUrl: investmentUrl,
                    details: await Investment.details(investmentUrl)
                }
                account['holdings'][investmentName] = investment
            }
        }
        return account
    }
}

class Investment implements IInvestmentDetails {
    [key: string]: any;
    sedol!: string;
    transactions!: ITransactions;
    lastDividend!: string;
    nextDividend!: string;
    firstDeal!: string;
    lastDeal!: string;
    totalDeals!: string;

    static details = async (url?: string) => {
        if (!url) { return }
        let investmentDetails = new Investment()
        let data = (await request.get(url)).body
        let $ = cheerio.load(data)
        let holdingInfo = $('table[class="table-unstyled"]')
            .find('strong')
            .toArray()
            .map(x => $(x).text().trim())
        if (holdingInfo.length === 0) { return }
        investmentDetails.firstDeal = holdingInfo[1];
        investmentDetails.lastDeal = holdingInfo[2];
        investmentDetails.totalDeals = holdingInfo[4];
        investmentDetails.nextDividend = holdingInfo[5]
        investmentDetails.lastDividend = holdingInfo[3]
        investmentDetails.sedol = url.match(/[^\/]+$/)![0]
        // // HoldingSummary
        // $('table[class="default-table"')
        //     .find('tr > td:nth-child(2)')
        //     .toArray()
        return investmentDetails
    }
}