import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    FirsName: z
      .string()
      .max(40, { message: "Must be 40 or fewer characters long" }),
    MiddleName: z
      .string()
      .max(40, { message: "Must be 40 or fewer characters long" }),
    LastNamePaternal: z
      .string()
      .max(40, { message: "Must be 40 or fewer characters long" }),
    LastNameMaternal: z
      .string()
      .max(40, { message: "Must be 40 or fewer characters long" }),
    Sex: z.string().max(20, { message: "Must be 20 or fewer characters long" }),
    RTN: z.string().max(14, { message: "Must be 14 or fewer characters long" }),
    Password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .nonempty(),
    PhoneNumber: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" })
      .nonempty(),
    Email: z
      .string()
      .email()
      .max(50, { message: "Must be 50 or fewer characters long" })
      .nonempty(),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    Email: z
      .string()
      .email()
      .max(50, { message: "Must be 50 or fewer characters long" })
      .nonempty(),
    NewPassword: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .nonempty(),
    RTN: z
      .string()
      .length(14, { message: "Must be exactly 14 characters long" }),
    PhoneNumber: z
      .string()
      .max(50, { message: "Must be 50 or fewer characters long" })
      .nonempty(),
  }),
  params: z.object({
    Id: z.string().nonempty(),
  }),
});
