import type { Product } from "../entities/product";

export interface ProductRepository {
  findAll(page?: number, pageSize?: number): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
