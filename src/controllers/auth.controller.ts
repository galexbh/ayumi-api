import { Application } from "express";
import { schemaValition } from "../middlewares/schemaValidator.middleware";
import { loginSchema } from "../schemas/login.schema";
import { Auth } from "../services/auth.services";

export class AuthController {
  private authservices: Auth;

  constructor(private app: Application) {
    this.authservices = new Auth();
    this.routes();
  }

  public routes() {
    this.app
      .route("/login/v1")
      .post(schemaValition(loginSchema), this.authservices.login);
  }
}
