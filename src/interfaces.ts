export interface IAccounts {
  [key: string]: IAccount | undefined;
}

export interface IAccount {
  stockValue: string;
  cashValue: string;
  totalValue: string;
  available: string;
  holdings: IInvestments;
}

export interface IInvestments {
  [key: string]: IInvestment;
}

export interface IInvestment {
  [key: string]: any;
  stockType: string;
  stockInfo: string;
  stockLink?: string;
  unitsHeld: string;
  price: string;
  value: string;
  cost: string;
  gain: string;
  gainPercentage: string;
  details?: IInvestmentDetails;
  ticker: string;
}

export interface IInvestmentDetails {
  [key: string]: any;
  sedol: string;
  transactions: ITransactions;
  lastDividend: string;
  nextDividend: string;
  firstDeal: string;
  lastDeal: string;
  totalDeals: string;
  holdingSummary?: IHoldingSummary;
}

export interface IHoldingSummary {
  [key: string]: any;
  highestPricePaid: string;
  lowestPricePaid: string;
  weightedAvgPaid: string;
  highestPriceRecieved: string;
  lowestPriceRecieved: string;
  weightedAvgRecieved: string;
}

export interface ITransactions {
  [key: string]: ITransaction;
}

export interface ITransaction {
  date: string;
  type: string;
  reference: string;
  unitCost: number;
  quantity: number;
  cost: number;
}
