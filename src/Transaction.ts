import { ITransaction } from "./interfaces";
 

export class Transaction implements ITransaction{
    date = '';
    type = '';
    reference = '';
    unitCost = 0;
    quantity = 0;
    cost = 0;


}