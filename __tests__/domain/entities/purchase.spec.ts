import { describe, expect, it } from "bun:test";
import { Purchase } from "../../../src/domain/entities/purchase";

describe("Purchase Entity", () => {
  it("should create a purchase entry with valid properties", () => {
    const date = new Date();
    const purchase = new Purchase("1", "101", "201", 10, 12.5, date);

    expect(purchase.id).toBe("1");
    expect(purchase.productId).toBe("101");
    expect(purchase.supplierId).toBe("201");
    expect(purchase.quantity).toBe(10);
    expect(purchase.purchasePrice).toBe(12.5);
    expect(purchase.purchaseDate).toBe(date);
  });

  it("should throw error for zero or negative quantity", () => {
    const date = new Date();
    expect(() => {
      new Purchase("2", "102", "202", 0, 15.75, date);
    }).toThrowError("Quantity must be greater than 0");

    expect(() => {
      new Purchase("3", "103", "203", -5, 15.75, date);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should throw error for zero or negative purchase price", () => {
    const date = new Date();
    expect(() => {
      new Purchase("4", "104", "204", 10, 0, date);
    }).toThrowError("Purchase price must be greater than 0");

    expect(() => {
      new Purchase("5", "105", "205", 10, -15.75, date);
    }).toThrowError("Purchase price must be greater than 0");
  });

  it("should throw error for invalid date", () => {
    expect(() => {
      new Purchase("6", "106", "206", 10, 15.75, new Date("invalid date"));
    }).toThrowError("Invalid date");
  });

  it("should allow updating purchase properties", () => {
    const date = new Date();
    const purchase = new Purchase("7", "107", "207", 20, 25.75, date);
    const newDate = new Date();

    purchase.changeQuantity(15);
    purchase.changePurchasePrice(27.75);
    purchase.changePurchaseDate(newDate);

    expect(purchase.quantity).toBe(15);
    expect(purchase.purchasePrice).toBe(27.75);
    expect(purchase.purchaseDate).toBe(newDate);
  });
});
