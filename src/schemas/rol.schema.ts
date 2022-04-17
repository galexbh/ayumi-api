import { z } from "zod";

export const rolSchema = z.object({
  nameRol: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

export type rolType = z.infer<typeof rolSchema>;
