import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import sql from "mssql";

import {
  userQueries,
} from "../database/querys";

export class Auth {
  public async login(req: Request, res: Response) {
    const request = new sql.Request();
    const { Email, Password } = req.body;

    try {
      const resultEmailUser = await request
        .input("Email", sql.VarChar, Email)
        .query(userQueries.getUserByEmail);

      const wordSecretValid = await bcrypt.compare(
        Password,
        resultEmailUser.recordset[0]["PasswordUser"]
      );

      if (!wordSecretValid) {
        return res.status(400).json({ message: "password invalid" });
      }

      return res.status(200).json(resultEmailUser.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }
}
