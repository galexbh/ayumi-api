import { Application } from "express";
import { Employeed } from "../services/employeed.services";

export class EmployeedController {
  private employeedservices: Employeed;

  constructor(private app: Application) {
    this.employeedservices = new Employeed();
    this.routes();
  }

  public routes() {
    
  }
}