import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    Email: z
      .string()
      .email("Email is required")
      .max(50, { message: "Must be 50 or fewer characters long" })
      .nonempty(),
    Password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .nonempty(),
  }),
});
