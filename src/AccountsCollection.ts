import request from "./requestInstance";
import cheerio from "cheerio";
import { IAccounts, IAccount } from "./interfaces";
import { Account } from "./Account";

export class AccountsCollection implements IAccounts {
  [key: string]: IAccount | undefined;

  // Factory method
  public static get = async () => {
    // Creates an instance of itself
    const accountsCollection = new AccountsCollection();

    let data: string = (
      await request.get("https://online.hl.co.uk/my-accounts")
    ).body;

    let $ = cheerio.load(data);
    let accounts = $('table[class="accounts-table"] tbody tr')
      .find("td:nth-child(1) a")
      .toArray();

    // For Of - allows async within
    for (const account of accounts) {
      accountsCollection[$(account).text().trim()] = await Account.getAccount(
        $(account).attr("href")
      );
    }
    // Return the async created AccountsCollection
    return accountsCollection;
  };
}
