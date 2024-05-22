import type { ProductRepository } from "../../../domain/repositories/product-repository";
import { ProductDTO } from "../../dtos/product-dto";


export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<ProductDTO[]> {
    const products = await this.productRepository.findAll();
    return products.map((product) => new ProductDTO(
      product.id,
      product.name,
      product.code,
      product.description,
      product.category
    ));
  }
}
