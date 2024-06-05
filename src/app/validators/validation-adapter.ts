import type { ZodError, ZodSchema } from "zod";

export class ValidationAdapter {
  static validate<T>(schema: ZodSchema<T>, data: any): T {
    const result = schema.safeParse(data);
    if (!result.success) {
      throw new ValidationError(result.error);
    }
    return result.data;
  }
}

export class ValidationError extends Error {
  constructor(public zodError: ZodError) {
    super('Validation Error');
    this.name = 'ValidationError';
  }
}