import { Request, Response } from "express";
import sql from "mssql";

export class Employeed {
  public async createUser(req: Request, res: Response) {
    const request = new sql.Request();
    const {} = req.body;

  }
}

