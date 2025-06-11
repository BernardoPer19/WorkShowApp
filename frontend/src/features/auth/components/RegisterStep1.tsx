import type { UseFormReturn } from "react-hook-form";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";
import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import type { RegisterType } from "../schema/AuthSchema";

type RegisterStep1Props = {
  currentStep: number;
  form: UseFormReturn<RegisterType>;
};

function RegisterStep1({ currentStep, form }: RegisterStep1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  return (
    <div>
      {currentStep === 1 && (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                O completa el formulario
              </span>
            </div>
          </div>

          {/* Personal Info Form */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nombre *</Label>
              <Input
                id="firstName"
                placeholder="Tu nombre"
                {...form.register("name", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                placeholder="Tu apellido"
                {...form.register("lastname", { required: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                className="pl-10"
                {...form.register("email", { required: true })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Nombre de usuario *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="username"
                placeholder="tu_usuario"
                className="pl-10"
                {...form.register("username", { required: true })}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Este será tu URL: WorkShow.com/
              {form.getValues("username") || "tu_usuario"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...form.register("password", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...form.register("confirmPassword", { required: true })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {password && confirmPassword && password !== confirmPassword && (
            <Alert variant="destructive">
              <AlertDescription>Las contraseñas no coinciden</AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
}

export default RegisterStep1;
