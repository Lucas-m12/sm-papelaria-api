import { describe, expect, it } from "bun:test";
import { StockDTO } from "../../../../src/app/dtos/stock-dto";
import { UpdateStockUseCase } from "../../../../src/app/use-cases/stock/update-stock-use-case";
import { Stock } from "../../../../src/domain/entities/stock";
import { TransactionType } from "../../../../src/domain/entities/transaction-type";
import { MockStockRepository } from "./mock-stock-repository";

describe("UpdateStockUseCase", () => {
  it("should update a stock entry successfully", async () => {
    const mockStockRepository = new MockStockRepository();
    const updateStockUseCase = new UpdateStockUseCase(mockStockRepository);

    const stock = new Stock("1", "101", TransactionType.ENTRY, 50, new Date());
    await mockStockRepository.save(stock);

    const updatedStockDTO = new StockDTO(
      "1",
      "101",
      TransactionType.EXIT,
      30,
      new Date(),
    );

    await updateStockUseCase.execute(updatedStockDTO);

    const updatedStock = await mockStockRepository.findById("1");
    expect(updatedStock).not.toBeNull();
    expect(updatedStock?.id).toBe("1");
    expect(updatedStock?.productId).toBe("101");
    expect(updatedStock?.transactionType).toBe(TransactionType.EXIT);
    expect(updatedStock?.quantity).toBe(30);
    expect(updatedStock?.dateTime).toBeInstanceOf(Date);
  });

  it("should throw error if stock entry not found", async () => {
    const mockStockRepository = new MockStockRepository();
    const updateStockUseCase = new UpdateStockUseCase(mockStockRepository);

    const stockDTO = new StockDTO(
      "1",
      "101",
      TransactionType.ENTRY,
      50,
      new Date(),
    );

    expect(() => updateStockUseCase.execute(stockDTO)).toThrowError(
      "stock not found",
    );
  });
});
