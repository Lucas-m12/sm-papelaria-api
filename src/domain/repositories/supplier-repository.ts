import type { Supplier } from "../entities/supplier";

export interface SupplierRepository {
  findAll(): Promise<Supplier[]>;
  findById(id: number): Promise<Supplier | null>;
  save(supplier: Supplier): Promise<void>;
  update(supplier: Supplier): Promise<void>;
  delete(id: number): Promise<void>;
}
