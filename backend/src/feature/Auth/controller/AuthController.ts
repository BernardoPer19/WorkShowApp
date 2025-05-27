import { CookieOptions, Request, Response } from "express";
import { validateLogin, validateRegister } from "../schemas/AuthSchea";
import { AuthService } from "../service/RegisterUser";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const validateData = validateRegister(req.body);
      const newUser = await AuthService.registerUser(validateData);

      res.status(200).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error("Error al registrarse");
      }
    }
  }
  static loginUser = async (req: Request, res: Response) => {
    const validatedData = validateLogin(req.body);

    const token = await AuthService.LoginService(
      validatedData.email,
      validatedData.password
    );

    const options: CookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    };

    res
      .status(200)
      .cookie("access_token", token, options)
      .json({
        message: "El usuario inició sesión con éxito!",
        bienvenida: `Bienvenido!! ${validatedData.email}`,
      });
  };
}
