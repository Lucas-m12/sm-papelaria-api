import { describe, expect, it } from "bun:test";
import { DeleteProductUseCase } from "../../../../src/app/use-cases/product/delete-product-use-case";
import { Product } from "../../../../src/domain/entities/product";
import { MockProductRepository } from "./mock-product-repository";

describe("DeleteProductUseCase", () => {
  it("should delete a product by id", async () => {
    const mockProductRepository = new MockProductRepository();
    const deleteProductUseCase = new DeleteProductUseCase(
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

    await deleteProductUseCase.execute("1");

    const deletedProduct = await mockProductRepository.findById("1");
    expect(deletedProduct).toBeNull();
  });
});
