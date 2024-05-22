import { Stock } from "../entities/stock";

export interface StockRepository {
  findAll(): Promise<Stock[]>;
  findById(id: number): Promise<Stock | null>;
  save(stock: Stock): Promise<void>;
  update(stock: Stock): Promise<void>;
  delete(id: number): Promise<void>;
}
