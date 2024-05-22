import { Sale } from "../entities/sale";

export interface SaleRepository {
  findAll(): Promise<Sale[]>;
  findById(id: number): Promise<Sale | null>;
  save(sale: Sale): Promise<void>;
  update(sale: Sale): Promise<void>;
  delete(id: number): Promise<void>;
}
