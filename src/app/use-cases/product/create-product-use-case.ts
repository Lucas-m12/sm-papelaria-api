import { Product } from "../../../domain/entities/product";
import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { ProductDTO } from "../../dtos/product-dto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productDTO: ProductDTO): Promise<void> {
    const product = new Product(
      productDTO.id,
      productDTO.name,
      productDTO.code,
      productDTO.description,
      productDTO.category
    );
    await this.productRepository.save(product);
  }
}
