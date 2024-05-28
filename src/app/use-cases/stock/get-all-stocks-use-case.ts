import type { StockRepository } from "../../../domain/repositories/stock-repository";

export class GetAllStocksUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute() {
    return await this.stockRepository.findAll();
  }
};