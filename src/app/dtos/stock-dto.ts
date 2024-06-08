import type { Stock } from "../../domain/entities/stock";
import type { TransactionType } from "../../domain/entities/transaction-type";

export class StockDTO {
  constructor(
    public id: string,
    public productId: string,
    public transactionType: TransactionType,
    public quantity: number,
    public dateTime: Date,
  ) {}

  static fromEntity(stock: Stock): StockDTO {
    return new StockDTO(
      stock.id,
      stock.productId,
      stock.transactionType,
      stock.quantity,
      stock.dateTime,
    );
  }
}
