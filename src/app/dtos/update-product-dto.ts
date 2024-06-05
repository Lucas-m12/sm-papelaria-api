import { z } from "zod";

export const UpdateProductSchema = z
  .object({
    id: z.string().uuid().min(1, { message: "Id is required" }),
    name: z.string().min(1, { message: "Name is required" }),
    code: z.string().min(1, { message: "Code is required" }),
    description: z.string().optional(),
    category: z.string().optional(),
  });

export type UpdateProductDTO = z.infer<typeof UpdateProductSchema>;