import { describe, expect, it } from "bun:test";
import { Supplier } from "../../../src/domain/entities/Supplier";

describe("Supplier Entity", () => {
  it("should create a supplier with valid properties", () => {
    const supplier = new Supplier(
      '1',
      "ABC Suppliers",
      "123-456-7890",
      "123 Main St"
    );

    expect(supplier.id).toBe('1');
    expect(supplier.name).toBe("ABC Suppliers");
    expect(supplier.contact).toBe("123-456-7890");
    expect(supplier.address).toBe("123 Main St");
  });

  it("should create a supplier without optional properties", () => {
    const supplier = new Supplier('2', "XYZ Suppliers");

    expect(supplier.id).toBe('2');
    expect(supplier.name).toBe("XYZ Suppliers");
    expect(supplier.contact).toBeUndefined();
    expect(supplier.address).toBeUndefined();
  });

  it("should throw error if name is missing or empty", () => {
    expect(() => {
      new Supplier('3', "");
    }).toThrowError("Supplier name cannot be empty");

    expect(() => {
      new Supplier('4', "   ");
    }).toThrowError("Supplier name cannot be empty");
  });

  it("should allow updating supplier properties", () => {
    const supplier = new Supplier(
      '5',
      "DEF Suppliers",
      "987-654-3210",
      "456 Market St"
    );
    supplier.changeName("GHI Suppliers");
    supplier.changeContact("555-555-5555");
    supplier.changeAddress("789 Broad St");

    expect(supplier.name).toBe("GHI Suppliers");
    expect(supplier.contact).toBe("555-555-5555");
    expect(supplier.address).toBe("789 Broad St");
  });

  it("should handle null or undefined optional properties", () => {
    const supplierWithNulls = new Supplier('6', "JKL Suppliers", null, null);
    const supplierWithUndefined = new Supplier(
      '7',
      "MNO Suppliers",
      undefined,
      undefined
    );

    expect(supplierWithNulls.contact).toBeNull();
    expect(supplierWithNulls.address).toBeNull();
    expect(supplierWithUndefined.contact).toBeUndefined();
    expect(supplierWithUndefined.address).toBeUndefined();
  });
});
