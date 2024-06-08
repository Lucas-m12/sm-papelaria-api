import { describe, expect, it } from "bun:test";
import type { CreateProductDTO } from "../../../../src/app/dtos/create-product-dto";
import { CreateProductUseCase } from "../../../../src/app/use-cases/product/create-product-use-case";
import { MockProductRepository } from "./mock-product-repository";

describe("CreateProductUseCase", () => {
  it("should create a product successfully", async () => {
    const mockProductRepository = new MockProductRepository();
    const createProductUseCase = new CreateProductUseCase(
      mockProductRepository,
    );

    const productDTO: CreateProductDTO = {
      name: "Notebook",
      code: "NB001",
      description: "A high-quality notebook",
      category: "Stationery",
    }

    await createProductUseCase.execute(productDTO);

    const [createdProduct] = await mockProductRepository.findAll();
    expect(createdProduct).not.toBeNull();
    expect(createdProduct?.id).toBeDefined();
    expect(createdProduct?.name).toBe("Notebook");
    expect(createdProduct?.code).toBe("NB001");
    expect(createdProduct?.description).toBe("A high-quality notebook");
    expect(createdProduct?.category).toBe("Stationery");
  });

});
