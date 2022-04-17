import {z} from "zod";

export const addressSchema = z.object({
    nameRol: z.string().max(50, {message: "Must be 50 or fewer characters long"})
});

export type addressType = z.infer<typeof addressSchema>