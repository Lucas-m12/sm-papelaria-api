import { describe, expect, it } from "bun:test";
import { Product } from "../../../src/domain/entities/product";

describe("Product Entity", () => {
  it("should create a product with all properties", () => {
    const product = new Product(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );

    expect(product.id).toBe("1");
    expect(product.name).toBe("Notebook");
    expect(product.code).toBe("NB001");
    expect(product.description).toBe("A high-quality notebook");
    expect(product.category).toBe("Stationery");
  });

  it("should create a product without optional properties", () => {
    const product = new Product("2", "Pen", "PEN001");

    expect(product.id).toBe("2");
    expect(product.name).toBe("Pen");
    expect(product.code).toBe("PEN001");
    expect(product.description).toBeUndefined();
    expect(product.category).toBeUndefined();
  });

  it("should allow updating product properties", () => {
    const product = new Product("3", "Eraser", "ERS001");
    product.changeDescription("A rubber eraser");
    product.changeCategory("Stationery");

    expect(product.description).toBe("A rubber eraser");
    expect(product.category).toBe("Stationery");
  });

  it("should handle empty strings for optional properties", () => {
    const product = new Product("4", "Ruler", "RUL001", "", "");

    expect(product.description).toBe("");
    expect(product.category).toBe("");
  });
});
