import type { StockRepository } from "../../../domain/repositories/stock-repository";

export class DeleteStockUseCase {
  constructor(private stockRepository: StockRepository) {

  }

  async execute(id: string) {
    const stock = await this.stockRepository.findById(id);
    if (!stock) {
      throw new Error("stock not found");
    }
    await this.stockRepository.delete(id);
  }
};