import { z } from "zod";

export const identifierSchema = z.object({
  params: z.object({
    Id: z.string().nonempty(),
  }),
});
