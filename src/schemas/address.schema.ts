import { z } from "zod";

export const addressSchema = z.object({
  body: z.object({
    NameRol: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" }),
  }),
});
