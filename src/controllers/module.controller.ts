import { Application } from "express";
import { Module } from "../services/module.services";

export class ModuleController {
  private moduleservices: Module;

  constructor(private app: Application) {
    this.moduleservices = new Module();
    this.routes();
  }

  public routes() {
    this.app.route("/module/v1")
    .get(this.moduleservices.getAllModule)
    .post(this.moduleservices.createModule);

    this.app.route("/module/v1/:Id")
    .put(this.moduleservices.updateModule)
    .delete(this.moduleservices.deleteModule);
  }
}