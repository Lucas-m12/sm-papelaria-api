import { ProductFactory } from "../../../domain/factories/product-factory";
import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { CreateProductDTO } from "../../dtos/create-product-dto";

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productDto: CreateProductDTO) {
    const product = ProductFactory.create(
      productDto.name,
      productDto.code,
      productDto.description,
      productDto.category,
    );
    await this.productRepository.save(product);
    return product;
  }
}
