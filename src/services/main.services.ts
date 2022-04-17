import { Request, Response } from "express";

export class MainService {
        public welcome(req: Request, res: Response) {
          const {name, adress} =req.body()
                return res.send({ message: name, hola: adress });
        }
}       
