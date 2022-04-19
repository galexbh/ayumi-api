import { Application } from "express";
import { schemaValition } from "../middlewares/schemaValidator.middleware";
import { identifierSchema } from "../schemas/identifier.schema";
import { createRolSchema, updateRolSchema } from "../schemas/rol.schema";
import { Rol } from "../services/rol.services";

export class RolController {
  private rolservices: Rol;

  constructor(private app: Application) {
    this.rolservices = new Rol();
    this.routes();
  }

  public routes() {
    this.app
      .route("/rol/v1")
      .get(this.rolservices.getAllRol)
      .post(schemaValition(createRolSchema), this.rolservices.createRol);

    this.app
      .route("/rol/v1/:Id")
      .put(schemaValition(updateRolSchema), this.rolservices.updateRol)
      .delete(schemaValition(identifierSchema), this.rolservices.deleteRol);
  }
}
