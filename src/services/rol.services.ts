import { Request, Response } from "express";
import sql from "mssql";

import { rolSchema, rolType } from "../schemas/rol.schema";
import { rolQueries } from "../database/querys";

export class Rol {
    
  public async createRol(req: Request, res: Response) {
    const request = new sql.Request();
    const { NameRoles } = req.body;

    const rolInput: rolType = {
        nameRol: NameRoles,
    };

    const result = rolSchema.safeParse(rolInput);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const queryResult = await request
      .input("NameRoles", sql.VarChar, NameRoles)
      .query(rolQueries.addNewRol);
    return res.status(200).json(queryResult);
  }
}
