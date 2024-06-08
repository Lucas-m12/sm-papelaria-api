import { CreateProductSchema } from "../../../app/dtos/create-product-dto";
import { GetAllProductsSchema } from "../../../app/dtos/get-all-products-dto";
import { UpdateProductSchema } from "../../../app/dtos/update-product-dto";
import { CreateProductUseCase } from "../../../app/use-cases/product/create-product-use-case";
import { CreateUrlToUploadImage } from "../../../app/use-cases/product/create-url-to-upload-image";
import { DeleteProductUseCase } from "../../../app/use-cases/product/delete-product-use-case";
import { GetAllProductsUseCase } from "../../../app/use-cases/product/get-all-products-use-case";
import { GetProductByIdUseCase } from "../../../app/use-cases/product/get-product-by-id-use-case";
import { UpdateProductUseCase } from "../../../app/use-cases/product/update-product-use-case";
import {
  ValidationAdapter,
  ValidationError,
} from "../../../app/validators/validation-adapter";
import { S3StorageService } from "../../adapters/s3-storage-service";
import { PrismaProductRepository } from "../../persistence/prisma-product-repository";
import type {
  HttpNextFunction,
  HttpRequest,
  HttpResponse,
} from "../http-adapter";

const productRepository = new PrismaProductRepository();

export class ProductController {
  async index(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction,
  ) {
    try {
      const { page, pageSize } = ValidationAdapter.validate(
        GetAllProductsSchema,
        request.query,
      );
      const getAllProductsUseCase = new GetAllProductsUseCase(
        productRepository,
      );
      await getAllProductsUseCase.execute({ page, pageSize });
      return response
        .status(200)
        .json({ message: "Product created successfully" });
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).json({ errors: error.zodError.errors });
      } else {
        response.status(500).json({ error });
      }
    }
  }

  async show(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction,
  ) {
    try {
      const { id } = request.params;
      const getProductByIdUseCase = new GetProductByIdUseCase(
        productRepository,
      );
      const product = await getProductByIdUseCase.execute(id);
      return response.status(200).json(product);
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).json({ errors: error.zodError.errors });
      } else {
        response.status(500).json({ error });
      }
    }
  }

  async create(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction,
  ) {
    try {
      const productDto = ValidationAdapter.validate(
        CreateProductSchema,
        request.body,
      );
      const createProductUseCase = new CreateProductUseCase(productRepository);
      const product = await createProductUseCase.execute(productDto);
      let presignedUrl: string | null = null;
      if (productDto?.filename) {
        const storageService = new S3StorageService();
        const createUrlToUploadImage = new CreateUrlToUploadImage(
          storageService,
        );
        presignedUrl = await createUrlToUploadImage.execute(
          productDto.filename,
          product,
        );
      }
      return response.status(201).json({ product, presignedUrl });
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).json({ errors: error.zodError.errors });
      } else {
        response.status(500).json({ error });
      }
    }
  }

  async update(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction,
  ): Promise<void> {
    try {
      const { id } = request.params;
      const { name, code, description, category } = request.body;
      const productDto = ValidationAdapter.validate(UpdateProductSchema, {
        id,
        name,
        code,
        description,
        category,
      });
      const updateProductUseCase = new UpdateProductUseCase(productRepository);
      await updateProductUseCase.execute(productDto);
      response.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).json({ errors: error.zodError.errors });
      } else {
        response.status(500).json({ error });
      }
    }
  }

  async delete(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction,
  ): Promise<void> {
    try {
      const { id } = request.params;
      const deleteProductUseCase = new DeleteProductUseCase(productRepository);
      await deleteProductUseCase.execute(id);
      response.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      if (error instanceof ValidationError) {
        response.status(400).json({ errors: error.zodError.errors });
      } else {
        response.status(500).json({ error });
      }
    }
  }
}
