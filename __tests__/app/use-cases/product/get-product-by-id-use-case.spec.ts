import { describe, expect, it } from "bun:test";
import { GetProductByIdUseCase } from "../../../../src/app/use-cases/product/get-product-by-id-use-case";
import { Product } from "../../../../src/domain/entities/product";
import { MockProductRepository } from "./mock-product-repository";

describe("GetProductByIdUseCase", () => {
  it("should return a product by id", async () => {
    const mockProductRepository = new MockProductRepository();
    const getProductByIdUseCase = new GetProductByIdUseCase(
      mockProductRepository,
    );

    const product = new Product(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );
    await mockProductRepository.save(product);

    const foundProduct = await getProductByIdUseCase.execute("1");
    expect(foundProduct).not.toBeNull();
    expect(foundProduct?.id).toBe("1");
    expect(foundProduct?.name).toBe("Notebook");
    expect(foundProduct?.code).toBe("NB001");
    expect(foundProduct?.description).toBe("A high-quality notebook");
    expect(foundProduct?.category).toBe("Stationery");
  });

  it("should throw if product not found", async () => {
    const mockProductRepository = new MockProductRepository();
    const getProductByIdUseCase = new GetProductByIdUseCase(
      mockProductRepository,
    );

    expect(() => getProductByIdUseCase.execute("99")).toThrow(
      "Product not found",
    );
  });
});
