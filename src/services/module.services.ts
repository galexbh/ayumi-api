import { Request, Response } from "express";
import { moduleSchema, moduleType } from "../schemas/module.schema";
import { moduleQueries } from "../database/querys";
import sql from "mssql";

export class Module {
  public async createModule(req: Request, res: Response) {
    const request = new sql.Request();
    const { NameModules } = req.body;

    const moduleInput: moduleType = {
      nameModule: NameModules,
    };

    const result = moduleSchema.safeParse(moduleInput);

    if (!result.success) {
      return res.status(400).json(result.error);
    }

    const queryResult = await request
      .input("NameModules", sql.VarChar, NameModules)
      .query(moduleQueries.addNewModule);
    return res.status(200).json(queryResult);
  }

  public getAllModule(_req: Request, res: Response) {
    const queryResult = sql.query(moduleQueries.getAllModule);
    return res.status(200).json(queryResult);
  }
/*
  public async updateModule(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;

    const queryResult = await sql.query(moduleQueries.updateModule);
    return res.status(200).json(queryResult);
  }
*/
  public async deleteModule(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;
    
    const queryResult = await request.input("Id", Id).query(moduleQueries.deleteModule);
    return res.status(200).json(queryResult.recordset);
  }
}
