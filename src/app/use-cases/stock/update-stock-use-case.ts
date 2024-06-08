import type { StockRepository } from "../../../domain/repositories/stock-repository";
import type { StockDTO } from "../../dtos/stock-dto";

export class UpdateStockUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute(stockDto: StockDTO) {
    const stock = await this.stockRepository.findById(stockDto.id);
    if (!stock) {
      throw new Error("stock not found");
    }
    stock.changeDateTime(stockDto.dateTime);
    stock.changeQuantity(stockDto.quantity);
    stock.changeTransactionType(stockDto.transactionType);
    await this.stockRepository.update(stock);
  }
}
