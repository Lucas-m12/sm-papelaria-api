import { describe, expect, it } from "bun:test";
import { GetStockByIdUseCase } from "../../../../src/app/use-cases/stock/get-stock-by-id-use-case";
import { Stock } from "../../../../src/domain/entities/stock";
import { TransactionType } from "../../../../src/domain/entities/transaction-type";
import { MockStockRepository } from "./mock-stock-repository";

describe("suit test to GetStockByIdUseCase", () => {
  it.skip("should return a stock entry by id", async () => {
    const mockStockRepository = new MockStockRepository();
    const getStockByIdUseCase = new GetStockByIdUseCase(mockStockRepository);

    const stock = new Stock("1", "101", TransactionType.ENTRY, 50, new Date());
    await mockStockRepository.save(stock);

    const foundStock = await getStockByIdUseCase.execute("1");
    expect(foundStock).toEqual(stock);
  });

  it.skip("should throw error if stock entry not found", async () => {
    const mockStockRepository = new MockStockRepository();
    const getStockByIdUseCase = new GetStockByIdUseCase(mockStockRepository);

    expect(() => getStockByIdUseCase.execute("99")).toThrowError(
      "stock not found",
    );
  });
});
