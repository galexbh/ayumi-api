import { Application } from "express";
import { schemaValition } from "../middlewares/schemaValidator.middleware";
import { identifierSchema } from "../schemas/identifier.schema";
import {
  createModuleSchema,
  updateModuleSchema,
} from "../schemas/module.schema";
import { Module } from "../services/module.services";

export class ModuleController {
  private moduleservices: Module;

  constructor(private app: Application) {
    this.moduleservices = new Module();
    this.routes();
  }

  public routes() {
    this.app
      .route("/module/v1")
      .get(this.moduleservices.getAllModule)
      .post(
        schemaValition(createModuleSchema),
        this.moduleservices.createModule
      );

    this.app
      .route("/module/v1/:Id")
      .put(schemaValition(updateModuleSchema), this.moduleservices.updateModule)
      .delete(
        schemaValition(identifierSchema),
        this.moduleservices.deleteModule
      );
  }
}
