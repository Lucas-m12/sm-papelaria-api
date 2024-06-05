import { CreateProductSchema } from "../../../app/dtos/create-product-dto";
import { GetAllProductsSchema } from "../../../app/dtos/get-all-products-dto";
import { UpdateProductSchema } from "../../../app/dtos/update-product-dto";
import { CreateProductUseCase } from "../../../app/use-cases/product/create-product-use-case";
import { DeleteProductUseCase } from "../../../app/use-cases/product/delete-product-use-case";
import { GetAllProductsUseCase } from "../../../app/use-cases/product/get-all-products-use-case";
import { GetProductByIdUseCase } from "../../../app/use-cases/product/get-product-by-id-use-case";
import { UpdateProductUseCase } from "../../../app/use-cases/product/update-product-use-case";
import { ValidationAdapter } from "../../../app/validators/validation-adapter";
import { PrismaProductRepository } from "../../persistence/prisma-product-repository";
import type { HttpNextFunction, HttpRequest, HttpResponse } from "../http-adapter";

const productRepository = new PrismaProductRepository();

export class ProductController {
  async index(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction
  ) {
    try {
      const { page, pageSize } = ValidationAdapter.validate(
        GetAllProductsSchema,
        request.query
      );
      const getAllProductsUseCase = new GetAllProductsUseCase(
        productRepository
      );
      await getAllProductsUseCase.execute({ page, pageSize });
      return response
        .status(200)
        .json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
      // if (error instanceof ValidationError) {
      //   response.status(400).json({ errors: error.zodError.errors });
      // } else {
      //   response.status(500).json({ message: "Internal server error" });
      // }
    }
  }

  async show(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction
  ) {
    try {
      const { id } = request.params;
      const getProductByIdUseCase = new GetProductByIdUseCase(
        productRepository
      );
      const product = await getProductByIdUseCase.execute(id);
      return response.status(200).json(product);
    } catch (error) {
      next(error);
      // if (!product) {
      //   return response.status(404).json({ message: "Product not found" });
      // }
    }
  }

  async create(
    request: HttpRequest,
    response: HttpResponse,
    next: HttpNextFunction
  ) {
    try {
      const productDTO = ValidationAdapter.validate(
        CreateProductSchema,
        request.body
      );
      const createProductUseCase = new CreateProductUseCase(productRepository);
      await createProductUseCase.execute(productDTO);
      return response
        .status(201)
        .json({ message: "Product created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const { name, code, description, category } = req.body;
      const productDTO = ValidationAdapter.validate(UpdateProductSchema, {
        id,
        name,
        code,
        description,
        category,
      });
      const updateProductUseCase = new UpdateProductUseCase(productRepository);
      await updateProductUseCase.execute(productDTO);
      res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: HttpRequest,
    res: HttpResponse,
    next: HttpNextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const deleteProductUseCase = new DeleteProductUseCase(productRepository);
      await deleteProductUseCase.execute(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}