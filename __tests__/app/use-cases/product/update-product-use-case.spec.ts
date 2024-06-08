import { describe, expect, it } from "bun:test";
import { ProductDTO } from "../../../../src/app/dtos/product-dto";
import { UpdateProductUseCase } from "../../../../src/app/use-cases/product/update-product-use-case";
import { Product } from "../../../../src/domain/entities/product";
import { MockProductRepository } from "./mock-product-repository";

describe("UpdateProductUseCase", () => {
  it("should update a product successfully", async () => {
    const mockProductRepository = new MockProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(
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

    const createdProduct = await mockProductRepository.findById("1");

    expect(createdProduct).not.toBeNull();
    expect(createdProduct?.id).toBe("1");
    expect(createdProduct?.name).toBe("Notebook");
    expect(createdProduct?.code).toBe("NB001");
    expect(createdProduct?.description).toBe("A high-quality notebook");
    expect(createdProduct?.category).toBe("Stationery");

    const updatedProductDTO = new ProductDTO(
      "1",
      "Notebook Updated",
      "NB001",
      "An updated high-quality notebook",
      "Stationery",
    );

    await updateProductUseCase.execute(updatedProductDTO);

    const updatedProduct = await mockProductRepository.findById("1");
    expect(updatedProduct).not.toBeNull();
    expect(updatedProduct?.id).toBe("1");
    expect(updatedProduct?.name).toBe("Notebook Updated");
    expect(updatedProduct?.code).toBe("NB001");
    expect(updatedProduct?.description).toBe(
      "An updated high-quality notebook",
    );
    expect(updatedProduct?.category).toBe("Stationery");
  });

  it("should not update a product that does not exist", async () => {
    const mockProductRepository = new MockProductRepository();
    const updateProductUseCase = new UpdateProductUseCase(
      mockProductRepository,
    );

    const productDTO = new ProductDTO(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );

    expect(() => updateProductUseCase.execute(productDTO)).toThrow(
      "Product with id 1 does not exist",
    );
  });
});
