import type { Price } from "../entities/price";

export interface PriceRepository {
  findAll(): Promise<Price[]>;
  findById(id: number): Promise<Price | null>;
  save(price: Price): Promise<void>;
  update(price: Price): Promise<void>;
  delete(id: number): Promise<void>;
}
