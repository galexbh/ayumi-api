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
    this.app.route("/user/v1").get(this.userservices.getAllUser);

    this.app.route("/user/v1/:Id")
    .get(this.userservices.getUserById)
    .delete(this.userservices.deleteUser);
  }
}