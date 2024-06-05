import { ProductFactory } from "../../../domain/factories/product-factory";
import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { CreateProductDTO } from "../../dtos/create-product-dto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productDTO: CreateProductDTO): Promise<void> {
    const product = ProductFactory.create(
      productDTO.name,
      productDTO.code,
      productDTO.description,
      productDTO.category
    );
    await this.productRepository.save(product);
  }
}
