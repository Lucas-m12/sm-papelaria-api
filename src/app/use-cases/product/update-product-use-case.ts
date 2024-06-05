import { ProductFactory } from "../../../domain/factories/product-factory";
import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { UpdateProductDTO } from "../../dtos/update-product-dto";

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productDTO: UpdateProductDTO): Promise<void> {
    const existingProduct = await this.productRepository.findById(
      productDTO.id
    );
    if (!existingProduct) {
      throw new Error(`Product with id ${productDTO.id} does not exist`);
    }
    const product = ProductFactory.createWithId(
      productDTO.id,
      productDTO.name,
      productDTO.code,
      productDTO.description,
      productDTO.category
    );
    await this.productRepository.update(product);
  }
}
