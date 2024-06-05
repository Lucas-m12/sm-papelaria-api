import { z } from "zod";

export const GetAllProductsSchema = z.object({
  page: z.number().int().positive().default(1).optional(),
  pageSize: z.number().int().positive().default(10).optional(),
});

export type GetAllProductsDTO = z.infer<typeof GetAllProductsSchema>;