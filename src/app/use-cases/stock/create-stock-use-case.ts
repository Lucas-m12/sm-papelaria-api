import { Stock } from "../../../domain/entities/stock";
import type { StockRepository } from "../../../domain/repositories/stock-repository";
import type { StockDTO } from "../../dtos/stock-dto";

export class CreateStockUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute(stockDto: StockDTO) {
    const stock = new Stock(
      stockDto.id,
      stockDto.productId,
      stockDto.transactionType,
      stockDto.quantity,
      stockDto.dateTime,
    );
    await this.stockRepository.save(stock);
  }
}
