import type { ProductRepository } from "../../../domain/repositories/product-repository";
import type { GetAllProductsDTO } from "../../dtos/get-all-products-dto";

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ page = 1, pageSize = 10 }: GetAllProductsDTO) {
    const products = await this.productRepository.findAll(page, pageSize);
    const totalProducts = await this.productRepository.findTotal();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        code: product.code,
        description: product?.description,
        category: product?.category,
        imageUrl: product?.imageUrl,
      })),
      totalProducts,
      totalPages: Math.ceil(totalProducts / pageSize),
    }
  }
}
