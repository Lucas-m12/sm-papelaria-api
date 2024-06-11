import type { Product } from "../../../domain/entities/product";
import type { StorageService } from "../../../domain/interfaces/storage-service";
import type { ProductRepository } from "../../../domain/repositories/product-repository";
import { env } from "../../../shared/env";

export class CreateUrlToUploadImage {
  constructor(
    private readonly storageService: StorageService,
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(filename: string, product: Product) {
    const bucketName = env("BUCKET_NAME");
    const fileKey = `products/${product.id}-${filename}`;
    const presignedUrl = await this.storageService.getPresignedUploadUrl(
      bucketName,
      fileKey,
    );
    const fileUrl = this.storageService.getFileUrl(bucketName, fileKey);
    await this.productRepository.changeImage(product.id, fileUrl);
    return presignedUrl;
  }
}
