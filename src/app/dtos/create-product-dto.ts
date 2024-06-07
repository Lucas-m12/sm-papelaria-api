import { z } from "zod";

export const CreateProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }),
  code: z.string().min(1, { message: "Code is required" }),
  description: z.string().optional(),
  category: z.string().optional(),
  filename: z.string().optional(),
});

export type CreateProductDTO = z.infer<typeof CreateProductSchema>;