import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .email()
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

export type emailType = z.infer<typeof emailSchema>;
