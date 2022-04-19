import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import sql from "mssql";

import {
  phoneNumberQueries,
  emailQueries,
  userQueries,
} from "../database/querys";

export class User {
  public async createUser(req: Request, res: Response) {
    const request = new sql.Request();
    const {
      FirsName,
      MiddleName,
      LastNamePaternal,
      LastNameMaternal,
      Email,
      PhoneNumber,
      Sex,
      RTN,
      DateBirth,
      Password,
    } = req.body;

    const Age: number = userUtilities.calculateAge(DateBirth);

    const SecretWordEncrypted: string = await bcrypt.hash(Password, 5);

    try {
      const queryResultEmail = await request
        .input("Email", sql.VarChar, Email)
        .query(emailQueries.addNewEmail);
      try {
        const queryResultPhoneNumber = await request
          .input("PhoneNumber", sql.VarChar, PhoneNumber)
          .query(phoneNumberQueries.addNewPhoneNumber);
        try {
          const queryResultUser = await request
            .input("fk_rol", sql.Int, 1)
            .input(
              "fk_phoneNumber",
              sql.Int,
              queryResultPhoneNumber.recordset[0]["id"]
            )
            .input("fk_email", sql.Int, queryResultEmail.recordset[0]["id"])
            .input("FirsName", sql.VarChar, FirsName)
            .input("MiddleName", sql.VarChar, MiddleName)
            .input("LastNamePaternal", sql.VarChar, LastNamePaternal)
            .input("LastNameMaternal", sql.VarChar, LastNameMaternal)
            .input("Age", sql.TinyInt, Age)
            .input("Sex", sql.VarChar, Sex)
            .input("RTN", sql.Char, RTN)
            .input("PasswordUser", sql.VarChar, SecretWordEncrypted)
            .input(
              "DateBirth",
              sql.Date,
              new Date(DateBirth).toISOString().slice(0, 10)
            )
            .input(
              "DateCreated",
              sql.Date,
              new Date().toISOString().slice(0, 10)
            )
            .query(userQueries.addNewUser);
          return res.status(200).json(queryResultUser);
        } catch (err) {
          await request
            .input("Id", queryResultEmail.recordset[0]["id"])
            .query(emailQueries.deleteEmail);
          await request
            .input("Id", queryResultPhoneNumber.recordset[0]["id"])
            .query(phoneNumberQueries.deletePhoneNumber);
          return res.status(400).json({ message: err });
        }
      } catch (err) {
        await request
          .input("Id", queryResultEmail.recordset[0]["id"])
          .query(emailQueries.deleteEmail);
        return res.status(400).json({ message: err });
      }
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  public async getUserById(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;

    try {
      const queryResult = await request
        .input("Id", Id)
        .query(userQueries.getUserById);
      return res.status(200).json(queryResult.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  public async getAllUser(_req: Request, res: Response) {
    const request = new sql.Request();
    const queryResult = await request.query(userQueries.getAllUser);
    return res.status(200).json(queryResult);
  }

  public async deleteUser(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;

    try {
      const queryResult = await request
        .input("Id", Id)
        .query(userQueries.deleteUser);
      return res.status(200).json(queryResult.recordset);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  public async updateUser(req: Request, res: Response) {
    const request = new sql.Request();
    const { Id } = req.params;
    const {
      OldEmail,
      NewEmail,
      OldPassword,
      NewPassword,
      RTN,
      OldPhoneNumber,
      NewPhoneNumber,
    } = req.body;

    try {
      if (!(OldEmail === NewEmail)) {
        await request
          .input("OldEmail", OldEmail)
          .input("NewEmail", NewEmail)
          .query(emailQueries.updateEmail);
      }

      if (!(OldPhoneNumber === NewPhoneNumber)) {
        await request
          .input("OldPhoneNumber", OldPhoneNumber)
          .input("NewPhoneNumber", NewPhoneNumber)
          .query(phoneNumberQueries.updatePhoneNumber);
      }

      if (!(await bcrypt.compare(NewPassword, OldPassword))) {
        const SecretWordEncrypted: string = await bcrypt.hash(NewPassword, 5);

        await request
          .input("Id", Id)
          .input("Password", SecretWordEncrypted)
          .input("RTN", RTN)
          .query(userQueries.updateUser);
      }

      await request
        .input("Id", Id)
        .input("RTN", RTN)
        .query(userQueries.updateUserRTN);

      return res.status(200).json({ message: "successful request" });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  }

  //public async updateUserRol(req: Request, res: Response) {}
}

class userUtilities {
  static calculateAge(dateBirthday: string): number {
    let dateNow: Date = new Date();
    let birthday: Date = new Date(dateBirthday);
    let age: number = dateNow.getFullYear() - birthday.getFullYear();
    let month: number = dateNow.getMonth() - birthday.getMonth();

    if (month < 0 || (month === 0 && dateNow.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  }
}
