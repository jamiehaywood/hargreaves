import request from "./requestInstance";
import cheerio from "cheerio";
import { IInvestmentDetails, ITransactions } from "./interfaces";

export class Investment implements IInvestmentDetails {
  [key: string]: string | ITransactions;
  sedol = "";
  transactions = {} as ITransactions;
  lastDividend = "";
  nextDividend = "";
  firstDeal = "";
  lastDeal = "";
  totalDeals = "";

  static details = async (url?: string) => {
    if (!url) {
      return;
    }
    let investmentDetails = new Investment();
    let data = (await request.get(url)).body;
    let $ = cheerio.load(data);
    let holdingInfo = $('table[class="table-unstyled"]')
      .find("strong")
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
    // // HoldingSummary
    // $('table[class="default-table"')
    //     .find('tr > td:nth-child(2)')
    //     .toArray()
    return investmentDetails;
  };
}
