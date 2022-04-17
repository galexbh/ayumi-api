import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import sql from "mssql";

import { userSchema, userType } from "../schemas/user.schema";
import { loginSchema, loginType } from "../schemas/login.schema";
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

    const userInput: userType = {
      firsName: FirsName,
      middleName: MiddleName,
      lastNamePaternal: LastNamePaternal,
      lastNameMaternal: LastNameMaternal,
      sex: Sex,
      rtn: RTN,
      email: Email,
      passwordUser: Password,
      phoneNumber: PhoneNumber,
    };

    const resultUser = userSchema.safeParse(userInput);

    if (!resultUser.success) {
      return res.status(400).json(resultUser.error);
    }

    const Age: number = userUtilities.calculateAge(DateBirth);

    const SecretWordEncrypted: string = await bcrypt.hash(Password, 5);

    try {
      const queryResultEmail = await request
        .input("Email", sql.VarChar, Email)
        .query(emailQueries.addNewEmail);

      const queryResultPhoneNumber = await request
        .input("PhoneNumber", sql.VarChar, PhoneNumber)
        .query(phoneNumberQueries.addNewPhoneNumber);
      
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
        .input("DateBirth", sql.Date, new Date(DateBirth).toISOString().slice(0, 10))
        .input("DateCreated", sql.Date, new Date().toISOString().slice(0, 10))
        .query(userQueries.addNewUser);
      return res.status(200).json(queryResultUser);
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  }

  public async loginUser(req: Request, res: Response) {
    const request = new sql.Request();
    const { Email, Password } = req.body;

    const loginInput: loginType = {
      email: Email,
      passwordUser: Password,
    };

    const result = loginSchema.safeParse(loginInput);

    if (!result.success) {
      return res.status(400).json(result.error);
    }
    try{
    const resultEmailUser = await request
    .input("Email", sql.VarChar, Email)
    .query(userQueries.getUserByEmail);

    const wordSecretValid = await bcrypt.compare(
      Password,
      resultEmailUser.recordset[0]["PasswordUser"]
    );

    if (!wordSecretValid) {
      return res.status(400).json({ msg: "password invalid" });
    }

    return res.status(200).json(resultEmailUser.recordset);

    } catch(err){
      return res.status(400).json({ msg: err });
    }
    
  }

  //public async getUserById(req: Request, res: Response) {}

  //public async getAllUser(req: Request, res: Response) {}

  //public async deleteUser(req: Request, res: Response) {}

  //public async updateUser(req: Request, res: Response) {}
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
