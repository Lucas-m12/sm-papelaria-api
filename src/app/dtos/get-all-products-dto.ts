import { z } from "zod";

const stringToNumber = (val: unknown) => {
  if (typeof val === "string") {
    const parsed = Number.parseInt(val, 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  }
  return undefined;
};

export const GetAllProductsSchema = z.object({
  // pageSize: z.string().transform(
  //   (value) => Number.isNaN(Number.parseInt(value, 10))? 10 : Number.parseInt(value, 10)
  // ),
  // page: z.preprocess(stringToNumber, z.number().default(1)),
  // pageSize: z.preprocess(stringToNumber, z.number().default(10)),
  page: z.number().int().positive().default(1).optional().transform(stringToNumber),
  pageSize: z.number().int().positive().default(10).optional().transform(stringToNumber),
});

export type GetAllProductsDTO = z.infer<typeof GetAllProductsSchema>;
