import { Stock } from "../../../domain/entities/stock";
import type { StockRepository } from "../../../domain/repositories/stock-repository";
import type { StockDTO } from "../../dtos/stock-dto";

export class CreateStockUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute(stockDTO: StockDTO) {
    const stock = new Stock(
      stockDTO.id,
      stockDTO.productId,
      stockDTO.transactionType,
      stockDTO.quantity,
      stockDTO.dateTime
    );
    await this.stockRepository.save(stock);
  }
};