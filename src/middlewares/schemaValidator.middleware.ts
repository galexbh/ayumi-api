import { NextFunction, Response, Request } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValition =
  (schema: AnyZodObject) =>
  // @ts-ignore
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
          body: req.body,
          params: req.params,
          query: req.query
        });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res
          .status(400)
          .json(err.issues.map((issues) => ({ message: issues.message })));
      }
      return res.status(500).json({ message: "internal server error" });
    }
  };
