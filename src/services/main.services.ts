import { Request, Response } from "express";

export class MainService {
  public welcome(_req: Request, res: Response) {
    return res.send({ message: `hello mundo` });
  }
}
