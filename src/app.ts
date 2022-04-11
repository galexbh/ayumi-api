import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../.env") });

import sql from "mssql";
import dbConfig from "./database/config";

import { MainController } from "./controllers/main.controller";

class App {
  public app: Application;
  public mainController: MainController;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMSSQLConfig();

    this.mainController = new MainController(this.app);
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this.app.use(cors());
  }
  private setMSSQLConfig() {
    sql.connect(dbConfig, (err: any) => {
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
