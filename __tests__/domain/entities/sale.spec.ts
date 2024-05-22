import { describe, expect, it } from "bun:test";
import { Sale } from "../../../src/domain/entities/sale";

describe("Sale Entity", () => {
  it("should create a sale entry with valid properties", () => {
    const date = new Date();
    const sale = new Sale('1', '101', 10, 15.75, date);

    expect(sale.id).toBe('1');
    expect(sale.productId).toBe('101');
    expect(sale.quantity).toBe(10);
    expect(sale.salePrice).toBe(15.75);
    expect(sale.saleDate).toBe(date);
  });

  it("should throw error for zero or negative quantity", () => {
    const date = new Date();
    expect(() => {
      new Sale('2', '102', 0, 15.75, date);
    }).toThrowError("Quantity must be greater than 0");

    expect(() => {
      new Sale('3', '103', -5, 15.75, date);
    }).toThrowError("Quantity must be greater than 0");
  });

  it("should throw error for zero or negative sale price", () => {
    const date = new Date();
    expect(() => {
      new Sale('4', '104', 10, 0, date);
    }).toThrowError("Sale price must be greater than 0");

    expect(() => {
      new Sale('5', '105', 10, -15.75, date);
    }).toThrowError("Sale price must be greater than 0");
  });

  it("should throw error for invalid date", () => {
    expect(() => {
      new Sale('6', '106', 10, 15.75, new Date("invalid date"));
    }).toThrowError("Invalid date");
  });

  it("should allow updating sale properties", () => {
    const date = new Date();
    const sale = new Sale('7', '107', 20, 25.75, date);
    const newDate = new Date();

    sale.changeQuantity(15);
    sale.changeSalePrice(27.75);
    sale.changeSaleDate(newDate);

    expect(sale.quantity).toBe(15);
    expect(sale.salePrice).toBe(27.75);
    expect(sale.saleDate).toBe(newDate);
  });
});
