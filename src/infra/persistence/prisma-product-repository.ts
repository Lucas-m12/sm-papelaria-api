import { Product } from "../../domain/entities/product";
import type { ProductRepository } from "../../domain/repositories/product-repository";
import { prismaClient } from "../database/db";

export class PrismaProductRepository implements ProductRepository {
  async findAll(page = 1, pageSize = 10): Promise<Product[]> {
    const products = await prismaClient.product.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return products.map(
      (product) =>
        new Product(
          product.id,
          product.name,
          product.code,
          product.description,
          product.category,
        ),
    );
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prismaClient.product.findUnique({ where: { id } });
    if (!product) {
      return null;
    }
    return new Product(
      product.id,
      product.name,
      product.code,
      product.description,
      product.category,
    );
  }

  async save(product: Product): Promise<void> {
    await prismaClient.product.create({
      data: {
        id: product.id,
        name: product.name,
        code: product.code,
        description: product.description,
        category: product.category,
      },
    });
  }

  async update(product: Product): Promise<void> {
    await prismaClient.product.update({
      where: { id: product.id },
      data: {
        name: product.name,
        code: product.code,
        description: product.description,
        category: product.category,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.product.delete({ where: { id } });
  }
}
