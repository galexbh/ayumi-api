import { Application } from "express";
import { MainService } from "../services/main.services";

export class MainController {
  private mainservices: MainService;

  constructor(private app: Application) {
    this.mainservices = new MainService();
    this.routes();
  }

  public routes() {
    this.app.get("/", this.mainservices.welcome);
  }
}
