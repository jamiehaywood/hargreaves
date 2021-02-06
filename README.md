# <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Hargreaves_Lansdown_logo.svg/1280px-Hargreaves_Lansdown_logo.svg.png" height="22" /> UNOFFICIAL API ![](https://github.com/jamiehaywood/hl/workflows/build/badge.svg) ![](https://img.shields.io/npm/v/hargreaves-lansdown)

> This is an unofficial API to programatically access your Hargreaves Lansdown account

## Motivation

I wanted to programmatically access my ISA and share accounts with Hargreaves Lansdown, and they do not currently offer a developer API. This project spins up an endpoint that allows you to access your accounts in under 3 seconds

## Install

```
npm install hargreaves-lansdown
```

```
yarn add hargreaves-lansdown
```

## Usage

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

## Things to note

This package is versioned according to SemVer. However, it is still in active development and ⚠️ **versions < 1.0.0 are unstable and may potentially have breaking changes in every release.** ⚠️ With this in mind, if you install this from NPM, [**make sure you pin your version of `hargreaves-lansdown`**](https://docs.renovatebot.com/dependency-pinning/#what-is-dependency-pinning:~:text=If%20instead%20you%20%22pin%22%20your%20dependencies,foobar%20version%201.1.0%20and%20no%20other%22.)

If building & consuming from source, **make sure you use a separate fork.**

## Contributing
I am open to suggestions / contributions for this package. It is very much in active development & I will be maintaining it for the foreseeable future. If you're not confident writing TypeScript / JavaScript, please don't let that hold you back- raise an issue with features you would like to see & I will endeavour to build & release them. 

### Commits

The commit styling adheres to the **[Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/).** Please follow it!
As well as being visually satisfying in the repo, it also serves a purpose for versioning releases correctly.
When code is merged to the `master` branch, the commits in that pull request are analysed to determine whether the package version should be incremented by a major, minor or patch version.

### Code style & standards

This repo uses Prettier, pretty standard nowadays (pardon the pun..!). ESLint is on the roadmap of being added.

## Notes

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

## Future Updates

I am currently working on being able to query the accounts in more depth, right down to the individual holdings, and be able to programmatically buy and sell holdings.

If you enjoy using this package, consider buying me a coffee here ➡️ <a href="https://www.buymeacoffee.com/jamiehaywood" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 12px !important;width: 60px" ></a> or in real life!