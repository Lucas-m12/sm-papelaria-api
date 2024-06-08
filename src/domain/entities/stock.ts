import { TransactionType } from "./transaction-type";

export class Stock {
  #id: string;
  #productId: string;
  #transactionType: TransactionType;
  #quantity: number;
  #dateTime: Date;

  constructor(
    id: string,
    productId: string,
    transactionType: TransactionType,
    quantity: number,
    dateTime: Date,
  ) {
    this.#id = id;
    this.#productId = productId;
    this.#transactionType = transactionType;
    this.#quantity = quantity;
    this.#dateTime = dateTime;

    this.#validate();
  }

  #validate() {
    if (this.#quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    if (Number.isNaN(this.#dateTime.getTime())) {
      throw new Error("Invalid date");
    }

    if (!Object.values(TransactionType).includes(this.#transactionType)) {
      throw new Error("Invalid transaction type");
    }

    if (!this.#productId.trim()) {
      throw new Error("Product ID cannot be empty");
    }

    if (!this.#id.trim()) {
      throw new Error("Stock ID cannot be empty");
    }
  }

  changeTransactionType(transactionType: TransactionType) {
    this.#transactionType = transactionType;
    this.#validate();
  }

  changeQuantity(quantity: number) {
    this.#quantity = quantity;
    this.#validate();
  }

  changeDateTime(dateTime: Date) {
    this.#dateTime = dateTime;
  }

  get id() {
    return this.#id;
  }

  get productId() {
    return this.#productId;
  }

  get transactionType() {
    return this.#transactionType;
  }

  get quantity() {
    return this.#quantity;
  }

  get dateTime() {
    return this.#dateTime;
  }
}
