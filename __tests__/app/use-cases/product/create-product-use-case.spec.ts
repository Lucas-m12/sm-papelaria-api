import { describe, expect, it } from 'bun:test';
import { ProductDTO } from '../../../../src/app/dtos/product-dto';
import { CreateProductUseCase } from '../../../../src/app/use-cases/product/create-product-use-case';
import { MockProductRepository } from './mock-product-repository';

describe("CreateProductUseCase", () => {
  it("should create a product successfully", async () => {
    const mockProductRepository = new MockProductRepository();
    const createProductUseCase = new CreateProductUseCase(
      mockProductRepository
    );

    const productDTO = new ProductDTO(
      '1',
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );

    await createProductUseCase.execute(productDTO);

    const createdProduct = await mockProductRepository.findById('1');
    expect(createdProduct).not.toBeNull();
    expect(createdProduct?.id).toBe('1');
    expect(createdProduct?.name).toBe("Notebook");
    expect(createdProduct?.code).toBe("NB001");
    expect(createdProduct?.description).toBe("A high-quality notebook");
    expect(createdProduct?.category).toBe("Stationery");
  });

  it("should not create a product with an existing id", async () => {
    const mockProductRepository = new MockProductRepository();
    const createProductUseCase = new CreateProductUseCase(
      mockProductRepository
    );

    const productDTO = new ProductDTO(
      '1',
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );

    await createProductUseCase.execute(productDTO);

    const productDTO2 = new ProductDTO(
      '1',
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );

    expect(() => createProductUseCase.execute(productDTO2)).toThrow(
      "Product with id 1 already exists"
    );
  });
});
