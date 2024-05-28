import type { Stock } from "../../../../src/domain/entities/stock";
import type { StockRepository } from "../../../../src/domain/repositories/stock-repository";

export class MockStockRepository implements StockRepository {
  private stocks: Stock[] = [];

  async findAll(): Promise<Stock[]> {
    return this.stocks;
  }

  async findById(id: string): Promise<Stock | null> {
    return this.stocks.find((stock) => stock.id === id) || null;
  }

  async save(stock: Stock): Promise<void> {
    this.stocks.push(stock);
  }

  async update(stock: Stock): Promise<void> {
    const index = this.stocks.findIndex((s) => s.id === stock.id);
    if (index !== -1) {
      this.stocks[index] = stock;
    }
  }

  async delete(id: string): Promise<void> {
    this.stocks = this.stocks.filter((stock) => stock.id !== id);
  }
}
