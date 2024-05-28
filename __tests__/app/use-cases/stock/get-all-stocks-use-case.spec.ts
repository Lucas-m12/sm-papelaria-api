import { describe, expect, it } from "bun:test";
import { GetAllStocksUseCase } from "../../../../src/app/use-cases/stock/get-all-stocks-use-case";
import { Stock } from "../../../../src/domain/entities/stock";
import { TransactionType } from "../../../../src/domain/entities/transaction-type";
import { MockStockRepository } from "./mock-stock-repository";

describe("GetAllStocksUseCase", () => {
  it("should return all stock entries", async () => {
    const mockStockRepository = new MockStockRepository();
    const getAllStocksUseCase = new GetAllStocksUseCase(mockStockRepository);

    const stock1 = new Stock('1', '101', TransactionType.ENTRY, 50, new Date());
    const stock2 = new Stock('2', '102', TransactionType.EXIT, 20, new Date());

    await mockStockRepository.save(stock1);
    await mockStockRepository.save(stock2);

    const stocks = await getAllStocksUseCase.execute();
    expect(stocks).toEqual([stock1, stock2]);
  });
});
