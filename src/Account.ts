import cheerio from "cheerio";
import request from "./requestInstance";
import { IAccount, IInvestments, IInvestment } from "./interfaces";
import { Investment } from "./Investment";

export class Account implements IAccount {
  stockValue = "";
  cashValue = "";
  totalValue = "";
  totalGain = "";
  totalGainPercentage = "";
  available = "";
  holdings = {} as IInvestments;

  public static getAccount = async (url?: string) => {
    if (!url) {
      throw new Error("There was an error parsing an account");
    }
    let account = new Account();
    let data: string = (await request.get(url)).body;
    let $ = cheerio.load(data);
    account.stockValue = $("#stock_total_header").text().trim();
    account.cashValue = $("#cash_total_header").text().trim();
    account.totalValue = $("#account_total_header").text().trim();
    account.totalGain = `£${$("#gaingbp_total").text().trim()}`;
    account.totalGainPercentage = `${$("#gainpc_total").text().trim()}%`;
    account.available = $(
      '[summary="Available funds on this account"] tbody tr:nth-child(1) td.aRight'
    )
      .text()
      .trim();

    let investmentRow = $("#holdings-table > tbody > tr").toArray();
    for (const investmenthtml of investmentRow) {
      let investmentName = $('span[class="text-bold"]', investmenthtml)
        .text()
        .trim();
      let investmentUrl = $(investmenthtml)
        .find("div > a.link-headline")
        .attr("href");
      if (url) {
        let array = $(investmenthtml)
          .find("td")
          .toArray()
          .map((element) => $(element).text().trim().replace(/\n/g, ""));
        let investment: IInvestment = {
          ticker: array[0],
          unitsHeld: array[2],
          cost: array[5],
          price: array[3],
          value: array[4],
          gain: array[16],
          gainPercentage: array[17],
          stockType: "",
          stockInfo: "",
          stockUrl: investmentUrl,
          details: await Investment.details(investmentUrl),
        };
        account["holdings"][investmentName] = investment;
      }
    }
    return account;
  };
}
