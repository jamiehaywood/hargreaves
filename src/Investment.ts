import request from './requestInstance';
import cheerio from 'cheerio';
import { IInvestmentDetails, ITransaction, ITransactions } from './interfaces';

export class Investment implements IInvestmentDetails {
  [key: string]: string | ITransactions;
  sedol = '';
  transactions = {} as ITransactions;
  lastDividend = '';
  nextDividend = '';
  firstDeal = '';
  lastDeal = '';
  totalDeals = '';

  static details = async (url?: string) => {
    if (!url) {
      return;
    }
    let investmentDetails = new Investment();
    let data = (await request.get(url)).body;
    let $ = cheerio.load(data);
    let holdingInfo = $('table[class="table-unstyled"]')
      .find('strong')
      .toArray()
      .map((x) => $(x).text().trim());
    if (holdingInfo.length === 0) {
      return;
    }
    investmentDetails.firstDeal = holdingInfo[1];
    investmentDetails.lastDeal = holdingInfo[2];
    investmentDetails.totalDeals = holdingInfo[4];
    investmentDetails.nextDividend = holdingInfo[5];
    investmentDetails.lastDividend = holdingInfo[3];
    investmentDetails.sedol = url.match(/[^\/]+$/)![0];

    let transactionRow = $("[class='hl-table security-movements-transactions-table'] > tbody > tr").toArray();

    for (const transactionhtml of transactionRow) {
      if (url) {
        let transactionArray = $(transactionhtml)
        .find('td')
        .toArray()
        .map((element) => $(element).text().trim().replace(/\n/g, ''));
        let transaction: ITransaction = {
          date: transactionArray[0],
          type: transactionArray[1],
          reference: transactionArray[2],
          unitCost: Number(transactionArray[3]),
          quantity: Number(transactionArray[4]),
          cost: Number(transactionArray[5])
        };
        investmentDetails['transactions'][transaction.reference] = transaction;
      }
    }

    return investmentDetails;
  };
}
