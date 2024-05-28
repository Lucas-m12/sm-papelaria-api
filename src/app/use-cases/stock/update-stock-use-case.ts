import type { StockRepository } from "../../../domain/repositories/stock-repository";
import type { StockDTO } from "../../dtos/stock-dto";

export class UpdateStockUseCase {
  constructor(private stockRepository: StockRepository) {}

  async execute(stockDTO: StockDTO) {
    const stock = await this.stockRepository.findById(stockDTO.id);
    if (!stock) {
      throw new Error("stock not found");
    }
    stock.changeDateTime(stockDTO.dateTime);
    stock.changeQuantity(stockDTO.quantity);
    stock.changeTransactionType(stockDTO.transactionType);
    await this.stockRepository.update(stock);
  }
}