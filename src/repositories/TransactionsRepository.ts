/* eslint-disable no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeSum = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((incomeSum, transaction) => incomeSum + transaction.value, 0);

    const outcomeSum = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((outcomeSum, transaction) => outcomeSum + transaction.value, 0);

    const total = incomeSum - outcomeSum;

    return {
      income: incomeSum,
      outcome: outcomeSum,
      total,
    };
  }

  public create({ id, title, value, type }: Transaction): Transaction {
    const transaction = {
      id,
      title,
      value,
      type,
    };

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
