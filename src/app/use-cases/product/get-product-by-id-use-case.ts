import type { ProductRepository } from "../../../domain/repositories/product-repository";
import { ProductDTO } from "../../dtos/product-dto";

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<ProductDTO> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new Error('Product not found');
    return ProductDTO.fromEntity(product);
  }
}
