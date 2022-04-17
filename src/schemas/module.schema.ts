import { z } from "zod";

export const moduleSchema = z.object({
  nameModule: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

export type moduleType = z.infer<typeof moduleSchema>;
