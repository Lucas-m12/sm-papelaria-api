import { ProductFactory } from "../../../domain/factories/product-factory";
import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { UpdateProductDTO } from "../../dtos/update-product-dto";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productDto: UpdateProductDTO): Promise<void> {
    const existingProduct = await this.productRepository.findById(
      productDto.id,
    );
    if (!existingProduct) {
      throw new Error(`Product with id ${productDto.id} does not exist`);
    }
    const product = ProductFactory.createWithId(
      productDto.id,
      productDto.name,
      productDto.code,
      productDto.description,
      productDto.category,
    );
    await this.productRepository.update(product);
  }
}
