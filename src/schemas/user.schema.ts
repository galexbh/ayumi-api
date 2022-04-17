import { z } from "zod";

export const userSchema = z.object({
  firsName: z
    .string()
    .max(40, { message: "Must be 40 or fewer characters long" }),
  middleName: z
    .string()
    .max(40, { message: "Must be 40 or fewer characters long" }),
  lastNamePaternal: z
    .string()
    .max(40, { message: "Must be 40 or fewer characters long" }),
  lastNameMaternal: z
    .string()
    .max(40, { message: "Must be 40 or fewer characters long" }),
  sex: z.string().max(20, { message: "Must be 20 or fewer characters long" }),
  rtn: z.string().max(14, { message: "Must be 14 or fewer characters long" }),
  passwordUser: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" }),
  phoneNumber: z
    .string()
    .max(50, { message: "Must be 50 or fewer characters long" }),
  email: z
    .string()
    .email()
    .max(50, { message: "Must be 50 or fewer characters long" }),
});

export type userType = z.infer<typeof userSchema>;
