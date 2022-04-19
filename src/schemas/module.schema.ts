import { z } from "zod";

export const createModuleSchema = z.object({
  body: z.object({
    NameModule: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" }),
  }),
});

export const updateModuleSchema = z.object({
  body: z.object({
    NameModule: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" }),
  }),
  params: z.object({
    Id: z.string().nonempty(),
  }),
});
