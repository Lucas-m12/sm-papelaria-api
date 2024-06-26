import type { Stock } from "../entities/stock";

export interface StockRepository {
  findAll(): Promise<Stock[]>;
  findById(id: string): Promise<Stock | null>;
  save(stock: Stock): Promise<void>;
  update(stock: Stock): Promise<void>;
  delete(id: string): Promise<void>;
}
