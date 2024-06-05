import type { Product } from "../../../../src/domain/entities/product";
import type { ProductRepository } from "../../../../src/domain/repositories/product-repository";


export class MockProductRepository implements ProductRepository {
  private products: Product[] = [];

  async findAll(page = 1, pageSize = 10): Promise<Product[]> {
    return this.products.slice((page - 1) * pageSize, page * pageSize);
  }

  async findById(id: string): Promise<Product | null> {
    return this.products.find((product) => product.id === id) || null;
  }

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async update(product: Product): Promise<void> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id);
  }
}
