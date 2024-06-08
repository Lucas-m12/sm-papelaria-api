import { describe, expect, it } from "bun:test";
import { Price } from "../../../src/domain/entities/Price";

describe("Price Entity", () => {
  it("should create a price entry with valid properties", () => {
    const date = new Date();
    const price = new Price("1", "101", 10.5, 15.75, date);

    expect(price.id).toBe("1");
    expect(price.productId).toBe("101");
    expect(price.purchasePrice).toBe(10.5);
    expect(price.salePrice).toBe(15.75);
    expect(price.effectiveDate).toBe(date);
  });

  it("should throw error for zero or negative purchase price", () => {
    const date = new Date();
    expect(() => {
      new Price("2", "102", 0, 15.75, date);
    }).toThrowError("Purchase price must be greater than zero");

    expect(() => {
      new Price("3", "103", -10.5, 15.75, date);
    }).toThrowError("Purchase price must be greater than zero");
  });

  it("should throw error for zero or negative sale price", () => {
    const date = new Date();
    expect(() => {
      new Price("4", "104", 10.5, 0, date);
    }).toThrowError("Sale price must be greater than zero");

    expect(() => {
      new Price("5", "105", 10.5, -15.75, date);
    }).toThrowError("Sale price must be greater than zero");
  });

  it("should throw error for invalid date", () => {
    expect(() => {
      new Price("6", "106", 10.5, 15.75, new Date("invalid date"));
    }).toThrowError("Invalid date");
  });

  it("should allow updating price properties", () => {
    const date = new Date();
    const price = new Price("7", "107", 20.5, 25.75, date);
    const newDate = new Date();

    price.changePurchasePrice(22.5);
    price.changeSalePrice(27.75);
    price.changeEffectiveDate(newDate);

    expect(price.purchasePrice).toBe(22.5);
    expect(price.salePrice).toBe(27.75);
    expect(price.effectiveDate).toBe(newDate);
  });
});
