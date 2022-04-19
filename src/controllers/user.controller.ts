import { Application } from "express";
import { schemaValition } from "../middlewares/schemaValidator.middleware";
import { identifierSchema } from "../schemas/identifier.schema";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { User } from "../services/user.services";

export class UserController {
  private userservices: User;

  constructor(private app: Application) {
    this.userservices = new User();
    this.routes();
  }

  public routes() {
    this.app
      .route("/user/register/v1")
      .post(schemaValition(createUserSchema), this.userservices.createUser);
    this.app.route("/user/v1").get(this.userservices.getAllUser);

    this.app
      .route("/user/v1/:Id")
      .put(schemaValition(updateUserSchema), this.userservices.updateUser)
      .get(schemaValition(identifierSchema), this.userservices.getUserById)
      .delete(schemaValition(identifierSchema), this.userservices.deleteUser);
  }
}
