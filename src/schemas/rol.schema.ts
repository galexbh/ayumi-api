import { z } from "zod";

export const createRolSchema = z.object({
  body: z.object({
    NameRol: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" }),
  }),
});

export const updateRolSchema = z.object({
  body: z.object({
    NameRol: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" }),
  }),
  params: z.object({
    Id: z.string().nonempty(),
  }),
});
