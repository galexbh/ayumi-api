import { Request, Response } from "express";
import sql from "mssql";

import { rolQueries } from "../database/querys";

export class Rol {

  public async createRol(req: Request, res: Response) {
    const request = new sql.Request();
    const { NameRoles } = req.body;

    const queryResult = await request
      .input("NameRoles", sql.VarChar, NameRoles)
      .query(rolQueries.addNewRol);
    return res.status(200).json(queryResult);
  }

  public async getAllRol(_req: Request, res: Response) {
    const request = new sql.Request();
    const queryResult = await request.query(rolQueries.getAllRol);
    return res.status(200).json(queryResult);
  }

  public async updateRol(req: Request, res: Response) {
    const request = new sql.Request();
    const { NameRoles } = req.body;
    const { Id } = req.params;

    try {
      const queryResult = await request
        .input("Id", Id)
        .input("NameRoles", NameRoles)
        .query(rolQueries.updateRol);
      return res.status(200).json(queryResult.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  public async deleteRol(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;

    try {
      const queryResult = await request
        .input("Id", Id)
        .query(rolQueries.deleteRol);
      return res.status(200).json(queryResult.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}
