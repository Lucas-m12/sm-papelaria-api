import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { GetAllProductsDTO } from "../../dtos/get-all-products-dto";
import { ProductDTO } from "../../dtos/product-dto";

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ page, pageSize }: GetAllProductsDTO): Promise<ProductDTO[]> {
    const products = await this.productRepository.findAll(page, pageSize);
    return products.map(
      (product) =>
        new ProductDTO(
          product.id,
          product.name,
          product.code,
          product.description,
          product.category,
        ),
    );
  }
}
