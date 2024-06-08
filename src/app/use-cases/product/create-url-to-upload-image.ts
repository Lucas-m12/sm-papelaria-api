import type { Product } from "../../../domain/entities/product";
import type { StorageService } from "../../../domain/interfaces/storage-service";
import { env } from "../../../shared/env";

export class CreateUrlToUploadImage {
  constructor(private readonly storageService: StorageService) {}

  async execute(filename: string, product: Product) {
    const bucketName = env("BUCKET_NAME");
    const fileKey = `${product.id}-${filename}`;
    const presignedUrl = await this.storageService.getPresignedUploadUrl(
      bucketName,
      fileKey,
    );
    return presignedUrl;
  }
}
