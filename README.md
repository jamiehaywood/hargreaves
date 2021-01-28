# <span style="color:#0F1A48"><img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Hargreaves_Lansdown_logo.svg/1280px-Hargreaves_Lansdown_logo.svg.png" height="22" /> UNOFFICIAL API ![](https://github.com/jamiehaywood/hl/workflows/build/badge.svg)</span>

### <span style="color:#0F1A48">This is an unofficial API to programatically access your Hargreaves Lansdown account.</span>

## <div style="color:#0F1A48">Motivation</div>

<div style="color:#0F1A48"> I wanted to programmatically access my ISA and share accounts with Hargreaves Lansdown, and they do not currently offer a developer API. This project spins up an endpoint that allows you to access your accounts in under 3 seconds</div>

## <div style="color:#0F1A48"> Install </div>

```
npm install hargreaves-lansdown
```

```
yarn add hargreaves-lansdown
```

## <div style="color:#0F1A48"> Usage </div>

```
import HL from 'hargreaves-lansdown'

(async () => {
  const credentials = {
    username: "",
    password: "",
    dateOfBirth: "",
    secureNumber: "",
  };

  const hl = new HL();

  await hl.authenticate(credentials);

  console.log(await hl.getInDepth());

  await hl.logout();
})();
```

## <div style="color:#0F1A48"> Notes </div>
### `getInDepth()`
This method returns an object with the following interface:

```ts
interface IAccounts {
  [key: string]: IAccount | undefined;
}

interface IAccount {
  stockValue: string;
  cashValue: string;
  totalValue: string;
  available: string;
  holdings: IInvestments;
}

interface IInvestments {
  [key: string]: IInvestment;
}

interface IInvestment {
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

interface IInvestmentDetails {
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

interface IHoldingSummary {
  [key: string]: any;
  highestPricePaid: string;
  lowestPricePaid: string;
  weightedAvgPaid: string;
  highestPriceRecieved: string;
  lowestPriceRecieved: string;
  weightedAvgRecieved: string;
}

interface ITransactions {
  [key: string]: ITransaction;
}

interface ITransaction {
  date: string;
  type: string;
  reference: string;
  unitCost: number;
  quantity: number;
  cost: number;
}
```

### `logout()`

If you are using `hargreaves-lansdown` in a continually running server environment, make sure you call `logout()` at the end of calling `getInDepth()`. This clears session cookies which ensures there are no weird authentication side-effects.

## <div style="color:#0F1A48"> Future Updates </div>

I am currently working on being able to query the accounts in more depth, right down to the individual holdings, and be able to programmatically buy and sell holdings.

## <div style="color:#0F1A48"> Contributing </div>

Please feel free to fork, contribute, rewrite etc.
