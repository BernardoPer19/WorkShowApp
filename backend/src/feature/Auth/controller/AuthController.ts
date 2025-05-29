import { CookieOptions, Request, Response } from "express";
import { validateLogin, validateRegister } from "../schemas/AuthSchea";
import { AuthService } from "../service/RegisterUser";
import { UserType } from "@/types/AuthTypes";
import { createToken } from "../utils/AuthUtils";

export class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const validateData = validateRegister(req.body);
      const newUser = await AuthService.registerUser(validateData);

      res.status(200).json(newUser);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        throw new Error("Error al registrarse");
      }
    }
  }
  static loginUser = async (req: Request, res: Response) => {
    try {
      const validatedData = validateLogin(req.body);

      const user = await AuthService.LoginService(
        validatedData.email,
        validatedData.password
      );

      const token = createToken(user);

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
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        throw new Error("Error al iniciar sesion");
      }
    }
  };

  static async logoutController(_req: Request, res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).send({ message: "Sesión cerrada correctamente" });
  }

  static async protectedRoute(req: Request, res: Response) {
    const user = req.user as UserType;

    if (!user) {
      res
        .status(400)
        .json({ message: "Cuenta no autorizada para esta accion" });
    }
    res.status(200).json({ message: "Usuario autorizado", user });
  }

  static getCurrentUser = (req: Request, res: Response) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuario actual" });
    }
  };
}
