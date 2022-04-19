import { Request, Response } from "express";
import { moduleQueries } from "../database/querys";
import sql from "mssql";

export class Module {
  public async createModule(req: Request, res: Response) {
    const request = new sql.Request();
    const { NameModules } = req.body;

    const queryResult = await request
      .input("NameModules", sql.VarChar, NameModules)
      .query(moduleQueries.addNewModule);
    return res.status(200).json(queryResult);
  }

  public async getAllModule(_req: Request, res: Response) {
    const request = new sql.Request();
    const queryResult = await request.query(moduleQueries.getAllModule);
    return res.status(200).json(queryResult);
  }

  public async updateModule(req: Request, res: Response) {
    const request = new sql.Request();
    const { NameModules } = req.body;
    const { Id } = req.params;

    try {
      const queryResult = await request
        .input("Id", Id)
        .input("NameModules", NameModules)
        .query(moduleQueries.updateModule);
      return res.status(200).json(queryResult.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  public async deleteModule(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;

    try {
      const queryResult = await request
        .input("Id", Id)
        .query(moduleQueries.deleteModule);
      return res.status(200).json(queryResult.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}
