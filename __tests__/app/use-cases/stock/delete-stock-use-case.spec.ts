import { describe, expect, it } from "bun:test";
import { DeleteStockUseCase } from "../../../../src/app/use-cases/stock/delete-stock-use-case";
import { Stock } from "../../../../src/domain/entities/stock";
import { TransactionType } from "../../../../src/domain/entities/transaction-type";
import { MockStockRepository } from "./mock-stock-repository";

describe("Suit test to DeleteStockUseCase", () => {
  it("should delete a stock entry by id", async () => {
    const mockStockRepository = new MockStockRepository();
    const deleteStockUseCase = new DeleteStockUseCase(mockStockRepository);

    const stock = new Stock("1", "101", TransactionType.ENTRY, 50, new Date());
    await mockStockRepository.save(stock);

    await deleteStockUseCase.execute("1");

    const deletedStock = await mockStockRepository.findById("1");
    expect(deletedStock).toBeNull();
  });

  it("should throw error if stock entry not found", async () => {
    const mockStockRepository = new MockStockRepository();
    const deleteStockUseCase = new DeleteStockUseCase(mockStockRepository);

    expect(() => deleteStockUseCase.execute("1")).toThrowError(
      "stock not found",
    );
  });
});
