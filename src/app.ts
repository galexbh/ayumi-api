import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import fileUpload from "express-fileupload";

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

import sql from "mssql";
import dbConfig from "./database/config";

import { MainController } from "./controllers/main.controller";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";
import { ModuleController } from "./controllers/module.controller";
import { RolController } from "./controllers/rol.controller";

class App {
  public app: Application;
  public mainController: MainController;
  public authController: AuthController;
  public userController: UserController;
  public moduleController: ModuleController;
  public rolController: RolController;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMSSQLConfig();

    this.mainController = new MainController(this.app);
    this.authController = new AuthController(this.app);
    this.userController = new UserController(this.app);
    this.moduleController = new ModuleController(this.app);
    this.rolController = new RolController(this.app);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(morgan('combined'));
    this.app.use(cors());
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : './uploads'
  }));
  }
  private setMSSQLConfig() {
    sql.connect(dbConfig || process.env.DB_CONNECTION, (err: any) => {
      if (err) {
        console.error(err.message);
      }

      if (!err) {
        console.log("Successful Connection");
      }
    });
  }
}

export default new App().app;
