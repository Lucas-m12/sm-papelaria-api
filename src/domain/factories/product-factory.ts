import { randomUUID } from "node:crypto";
import { Product } from "../entities/product";

export class ProductFactory {
  static create(
    name: string,
    code: string,
    description?: string,
    category?: string,
  ) {
    return new Product(randomUUID(), name, code, description, category);
  }

  static createWithId(
    id: string,
    name: string,
    code: string,
    description?: string,
    category?: string,
  ) {
    return new Product(id, name, code, description, category);
  }
}
