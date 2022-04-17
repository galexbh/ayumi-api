import { z } from "zod";

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

export type phoneNumberType = z.infer<typeof phoneNumberSchema>;
