import { describe, expect, it } from 'bun:test';
import { StockDTO } from '../../../../src/app/dtos/stock-dto';
import { CreateStockUseCase } from '../../../../src/app/use-cases/stock/create-stock-use-case';
import { TransactionType } from '../../../../src/domain/entities/transaction-type';
import { MockStockRepository } from './mock-stock-repository';

describe('suit test to create stock use case', () => {
  it("should create a stock entry successfully", async () => {
    const mockStockRepository = new MockStockRepository();
    const createStockUseCase = new CreateStockUseCase(mockStockRepository);

    const stockDTO = new StockDTO(
      '1',
      '101',
      TransactionType.ENTRY,
      50,
      new Date(),
    );

    await createStockUseCase.execute(stockDTO);

    const createdStock = await mockStockRepository.findById('1');
    expect(createdStock).not.toBeNull();
    expect(createdStock?.id).toBe('1');
    expect(createdStock?.productId).toBe('101');
    expect(createdStock?.transactionType).toBe(TransactionType.ENTRY);
    expect(createdStock?.quantity).toBe(50);
    expect(createdStock?.dateTime).toBeInstanceOf(Date);
  });
});