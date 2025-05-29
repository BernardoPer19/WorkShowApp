
import { UserType } from "@/types/AuthTypes";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;


  if (!token) {
     res
      .status(401)
      .json({ message: "No autorizado: Token no proporcionado" });
      return
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_PASSWORD as string
    ) as UserType;

    
    req.user = decoded;
    next();
  } catch (err) {
     res.status(401).json({ message: "Token inválido o expirado" });
     return
  }
};
