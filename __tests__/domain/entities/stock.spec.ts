import { describe, expect, it } from "bun:test";

import { Stock } from "../../../src/domain/entities/Stock";
import { TransactionType } from "../../../src/domain/entities/transaction-type";

describe("Stock Entity", () => {
  it("should create a stock entry with valid properties", () => {
    const date = new Date();
    const stock = new Stock("1", "101", TransactionType.ENTRY, 50, date);

    expect(stock.id).toBe("1");
    expect(stock.productId).toBe("101");
    expect(stock.transactionType).toBe(TransactionType.ENTRY);
    expect(stock.quantity).toBe(50);
    expect(stock.dateTime).toBe(date);
  });

  it("should create a stock exit with valid properties", () => {
    const date = new Date();
    const stock = new Stock("2", "102", TransactionType.EXIT, 20, date);

    expect(stock.id).toBe("2");
    expect(stock.productId).toBe("102");
    expect(stock.transactionType).toBe(TransactionType.EXIT);
    expect(stock.quantity).toBe(20);
    expect(stock.dateTime).toBe(date);
  });

  it("should throw error for invalid transaction type", () => {
    const date = new Date();
    expect(() => {
      new Stock("3", "103", "invalid" as TransactionType.ENTRY, 10, date);
    }).toThrowError("Invalid transaction type");
  });

  it("should throw error for zero or negative quantity", () => {
    const date = new Date();
    expect(() => {
      new Stock("4", "104", TransactionType.ENTRY, 0, date);
    }).toThrowError("Quantity must be greater than 0");

    expect(() => {
      new Stock("5", "105", TransactionType.EXIT, -5, date);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should throw error for invalid date", () => {
    expect(() => {
      new Stock(
        "6",
        "106",
        TransactionType.ENTRY,
        10,
        new Date("invalid date"),
      );
    }).toThrowError("Invalid date");
  });

  it("should allow updating stock properties", () => {
    const date = new Date();
    const stock = new Stock("7", "107", TransactionType.ENTRY, 30, date);
    const newDate = new Date();

    stock.changeTransactionType(TransactionType.EXIT);
    stock.changeQuantity(15);
    stock.changeDateTime(newDate);

    expect(stock.transactionType).toBe(TransactionType.EXIT);
    expect(stock.quantity).toBe(15);
    expect(stock.dateTime).toBe(newDate);
  });
});
