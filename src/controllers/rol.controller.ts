import { Application } from "express";
import { Rol } from "../services/rol.services";

export class RolController {
  private rolservices: Rol;

  constructor(private app: Application) {
    this.rolservices = new Rol();
    this.routes();
  }

  public routes() {
    this.app.route("/rol/v1")
    .get(this.rolservices.getAllRol)
    .post(this.rolservices.createRol);
    
    this.app.route("/rol/v1/:Id")
    .put(this.rolservices.updateRol)
    .delete(this.rolservices.deleteRol);
  }
}