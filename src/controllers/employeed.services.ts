import { Application } from "express";
import { User } from "../services/user.services";

export class UserController {
  private userservices: User;

  constructor(private app: Application) {
    this.userservices = new User();
    this.routes();
  }

  public routes() {
    this.app.route("/user/register/v1").post(this.userservices.createUser);
    this.app.route("/user/login/v1").post(this.userservices.loginUser);
  }
}