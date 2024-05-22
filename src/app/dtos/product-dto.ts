import type { Product } from "../../domain/entities/product";


export class ProductDTO {
  constructor(
    public id: string,
    public name: string,
    public code: string,
    public description?: string,
    public category?: string
  ) {}

  static fromEntity(product: Product): ProductDTO {
    return new ProductDTO(
      product.id,
      product.name,
      product.code,
      product.description,
      product.category
    );
  }
}
