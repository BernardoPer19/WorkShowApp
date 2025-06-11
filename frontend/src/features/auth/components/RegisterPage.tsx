import { useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import { Alert, AlertDescription } from "../../../components/ui/alert";
import { Progress } from "../../../components/ui/progress";

import { ArrowLeft, ArrowRight, Check, Palette } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UserWithConfirmPasswordSchema,
  type RegisterType,
} from "../schema/AuthSchema";
import { useAuth } from "../hooks/useAuth";

const steps = [
  {
    id: 1,
    title: "Información Personal",
    description: "Datos básicos de tu cuenta",
  },
  {
    id: 2,
    title: "Perfil Profesional",
    description: "Tu especialidad y habilidades",
  },
  { id: 3, title: "Configuración", description: "Últimos detalles" },
];

export default function RegisterPage2() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { registerMutate } = useAuth().register;
  const router = useNavigate();

  const form = useForm<RegisterType>({
    resolver: zodResolver(UserWithConfirmPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      name: undefined,
      lastname: undefined,
      email: undefined,
      username: undefined,
      password: undefined,
      confirmPassword: undefined,
      profession: undefined,
      tecnologies: [],
      bio: undefined,
      avatar_url: undefined,
      portafolio_url: undefined,
    },
  });

  const watch = form.watch;

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          watch("name") &&
          watch("lastname") &&
          watch("email") &&
          watch("username") &&
          watch("password")
        );
      case 2:
        return watch("profession") && watch("tecnologies")?.length > 0;
      case 3:
        return true; // Puedes agregar validación como watch("acceptTerms") si lo usas
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      setError("");
    } else {
      setError("Por favor, completa todos los campos requeridos");
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setError("");
  };
  const handleSubmit = form.handleSubmit(
    async (data) => {
      if (!validateStep(3)) {
        setError("Por favor, acepta los términos y condiciones");
        return;
      }

      setIsLoading(true);
      registerMutate(data);
      console.log("FORM DATA:", data);

      setTimeout(() => {
        router("/auth/login");
      }, 2000);
    },
    (errors) => {
      console.log("❌ ZOD ERRORS:", errors);
      setError("Revisa los campos del formulario.");
    }
  );
  const progress = (currentStep / 3) * 100;

  return (
    <div className="">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold">WorkShow</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Únete a WorkShow</h1>
          <p className="text-muted-foreground">
            Crea tu cuenta y comienza a mostrar tu talento
          </p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-xl">
                  {steps[currentStep - 1].title}
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </div>
              <div className="text-sm text-muted-foreground">
                Paso {currentStep} de {steps.length}
              </div>
            </div>
            <Progress value={progress} className="w-full" />
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <FormProvider {...form}>
              <form onSubmit={handleSubmit}>
                <RegisterStep1 currentStep={currentStep} form={form} />
                <RegisterStep2 currentStep={currentStep} form={form} />
                <RegisterStep3 currentStep={currentStep} />

                <div className="flex justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    type="button"
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Anterior
                  </Button>

                  {currentStep < 3 ? (
                    <Button
                      onClick={nextStep}
                      type="button"
                      className="flex items-center gap-2"
                    >
                      Siguiente
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex items-center gap-2"
                    >
                      {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?
          </span>
          <Link
            to="/auth/login"
            className="text-sm text-primary hover:underline font-medium"
          >
            Inicia sesión aquí
          </Link>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
