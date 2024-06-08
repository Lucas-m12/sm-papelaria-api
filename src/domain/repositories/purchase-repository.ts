import type { Purchase } from "../entities/purchase";

export interface PurchaseRepository {
  findAll(): Promise<Purchase[]>;
  findById(id: number): Promise<Purchase | null>;
  save(purchase: Purchase): Promise<void>;
  update(purchase: Purchase): Promise<void>;
  delete(id: number): Promise<void>;
}
