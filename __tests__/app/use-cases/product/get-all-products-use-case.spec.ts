import { describe, expect, it } from "bun:test";
import { GetAllProductsUseCase } from "../../../../src/app/use-cases/product/get-all-products-use-case";
import { Product } from "../../../../src/domain/entities/product";
import { MockProductRepository } from "./mock-product-repository";

describe("GetAllProductsUseCase", () => {
  it("should return all products", async () => {
    const mockProductRepository = new MockProductRepository();
    const getAllProductsUseCase = new GetAllProductsUseCase(
      mockProductRepository,
    );

    const product1 = new Product(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );
    const product2 = new Product(
      "2",
      "Pen",
      "PEN001",
      "A smooth writing pen",
      "Stationery",
    );

    await Promise.all([
      mockProductRepository.save(product1),
      mockProductRepository.save(product2),
    ]);

    const products = await getAllProductsUseCase.execute({});
    expect(products).toHaveLength(2);
    expect(products[0].id).toBe("1");
    expect(products[0].name).toBe("Notebook");
    expect(products[0].code).toBe("NB001");
    expect(products[0].description).toBe("A high-quality notebook");
    expect(products[0].category).toBe("Stationery");
    expect(products[1].id).toBe("2");
    expect(products[1].name).toBe("Pen");
    expect(products[1].code).toBe("PEN001");
    expect(products[1].description).toBe("A smooth writing pen");
    expect(products[1].category).toBe("Stationery");
  });

  it("should return an empty array if there are no products", async () => {
    const mockProductRepository = new MockProductRepository();
    const getAllProductsUseCase = new GetAllProductsUseCase(
      mockProductRepository,
    );

    const products = await getAllProductsUseCase.execute({});
    expect(products).toHaveLength(0);
  });

  it("should return all products in the second page", async () => {
    const mockProductRepository = new MockProductRepository();
    const getAllProductsUseCase = new GetAllProductsUseCase(
      mockProductRepository,
    );

    const product1 = new Product(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );
    const product2 = new Product(
      "2",
      "Pen",
      "PEN001",
      "A smooth writing pen",
      "Stationery",
    );

    await Promise.all([
      mockProductRepository.save(product1),
      mockProductRepository.save(product2),
    ]);

    const products = await getAllProductsUseCase.execute({
      page: 2,
      pageSize: 1,
    });
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe("2");
    expect(products[0].name).toBe("Pen");
    expect(products[0].code).toBe("PEN001");
    expect(products[0].description).toBe("A smooth writing pen");
    expect(products[0].category).toBe("Stationery");
  });

  it("should return all products in the first page", async () => {
    const mockProductRepository = new MockProductRepository();
    const getAllProductsUseCase = new GetAllProductsUseCase(
      mockProductRepository,
    );

    const product1 = new Product(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );
    const product2 = new Product(
      "2",
      "Pen",
      "PEN001",
      "A smooth writing pen",
      "Stationery",
    );

    await Promise.all([
      mockProductRepository.save(product1),
      mockProductRepository.save(product2),
    ]);

    const products = await getAllProductsUseCase.execute({
      page: 1,
      pageSize: 1,
    });
    expect(products).toHaveLength(1);
    expect(products[0].id).toBe("1");
    expect(products[0].name).toBe("Notebook");
    expect(products[0].code).toBe("NB001");
    expect(products[0].description).toBe("A high-quality notebook");
    expect(products[0].category).toBe("Stationery");
  });

  it("should return products with default page and page size", async () => {
    const mockProductRepository = new MockProductRepository();
    const getAllProductsUseCase = new GetAllProductsUseCase(
      mockProductRepository,
    );

    const product1 = new Product(
      "1",
      "Notebook",
      "NB001",
      "A high-quality notebook",
      "Stationery",
    );
    const product2 = new Product(
      "2",
      "Pen",
      "PEN001",
      "A smooth writing pen",
      "Stationery",
    );

    await Promise.all([
      mockProductRepository.save(product1),
      mockProductRepository.save(product2),
    ]);

    const products = await getAllProductsUseCase.execute({});
    expect(products).toHaveLength(2);
    expect(products[0].id).toBe("1");
    expect(products[0].name).toBe("Notebook");
    expect(products[0].code).toBe("NB001");
    expect(products[0].description).toBe("A high-quality notebook");
    expect(products[0].category).toBe("Stationery");
    expect(products[1].id).toBe("2");
    expect(products[1].name).toBe("Pen");
    expect(products[1].code).toBe("PEN001");
    expect(products[1].description).toBe("A smooth writing pen");
    expect(products[1].category).toBe("Stationery");
  });
});
