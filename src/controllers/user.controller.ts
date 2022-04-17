import { Application } from "express";
import { User } from "../services/user.services";

export class UserController {
  private userservices: User;

  constructor(private app: Application) {
    this.userservices = new User();
    this.routes();
  }

  public routes() {
    this.app.post("/user/register/v1", this.userservices.createUser);
    this.app.post("/user/login/v1", this.userservices.loginUser);
  }
}