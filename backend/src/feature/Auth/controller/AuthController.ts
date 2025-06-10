// AuthController.ts
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
      return
    } catch (error) {
      console.error("Error en register:", error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno del servidor" });
      }
    }
  }

  static loginUser = async (req: Request, res: Response) => {
    try {
      const validatedData = validateLogin(req.body);

      const userFromDB = await AuthService.LoginService(
        validatedData.email,
        validatedData.password
      );

      const user: UserType = {
        user_id: userFromDB.user_id,
        username: userFromDB.username,
        email: userFromDB.email,
        profession: userFromDB.profession,
        created_at: userFromDB.created_at,
        bio: userFromDB.bio,
        avatar_url: userFromDB.avatar_url,
        portafolio_url: userFromDB.portafolio_url,
      };

      const token = createToken(user);
      console.log("🔑 Token creado para:", user.email); // Debug

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
      console.error("❌ Error en login:", error);
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Error interno del servidor" });
      }
    }
  };

  static async logoutController(_req: Request, res: Response) {
    try {
      console.log("🚪 Cerrando sesión...");
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax", // ✅ Cambié de strict a lax para consistencia
      });
      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } catch (error) {
      console.error("❌ Error en logout:", error);
      res.status(500).json({ message: "Error al cerrar sesión" });
    }
  }

  static async protectedRoute(req: Request, res: Response) {
    try {
      const user = req.user as UserType;
      console.log("🔒 Ruta protegida - Usuario:", user?.email);

      if (!user) {
        res
          .status(401)
          .json({ message: "Cuenta no autorizada para esta accion" });
        return
      }
      res.status(200).json({ message: "Usuario autorizado", user });
    } catch (error) {
      console.error("❌ Error en protectedRoute:", error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  // ✅ MÉTODO PRINCIPAL CORREGIDO
  static getProfileData = async (req: Request, res: Response) => {
    try {
      console.log("👤 getProfileData - Iniciando...");
      const user = req.user as UserType;
      console.log("👤 Usuario decodificado:", user);

      if (!user) {
        console.log("❌ No hay usuario en req.user");
        res.status(401).json({ message: "Usuario no autenticado" });
        return
      }

      // ✅ Respuesta completa y consistente
      const userData = {
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profession: user.profession, // ✅ Cambiado de "profesion" a "profession"
        avatar_url: user.avatar_url,
        portafolio_url: user.portafolio_url,
        created_at: user.created_at,
      };

      console.log("✅ Enviando userData:", userData);
      res.status(200).json(userData);
    } catch (error) {
      console.error("❌ Error en getProfileData:", error);
      res.status(500).json({ message: "Error al obtener datos del perfil" });
    }
  };
}