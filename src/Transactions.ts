import { ITransaction, ITransactions } from "./interfaces";

export class Transactions implements ITransactions {
    [key: string] : ITransaction;
}