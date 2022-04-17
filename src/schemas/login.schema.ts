import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  passwordUser: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
});

export type loginType = z.infer<typeof loginSchema>;
