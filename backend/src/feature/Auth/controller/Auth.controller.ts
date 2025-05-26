import { Request, Response } from "express";
import { validateRegister } from "../schemas/AuthSchea";
import { AuthService } from "../service/RegisterUser";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const validateData = validateRegister(req.body);
      const newUser = await AuthService.registerUser(validateData);

      res.status(200).json(newUser);
    } catch (error) {}
  }
}
