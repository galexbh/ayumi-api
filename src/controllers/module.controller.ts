import { Application } from "express";
import { Module } from "../services/module.services";

export class ModuleController {
  private moduleservices: Module;

  constructor(private app: Application) {
    this.moduleservices = new Module();
    this.routes();
  }

  public routes() {
    this.app.post("/module", this.moduleservices.createModule);
  }
}