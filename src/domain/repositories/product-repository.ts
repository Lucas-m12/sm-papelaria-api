import type { Product } from "../entities/product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  save(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  delete(id: number): Promise<void>;
}
