import type React from "react";

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

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Github,
  Chrome,
  Linkedin,
  ArrowLeft,
  ArrowRight,
  Upload,
  Check,
  Palette,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RegisterStep1 from "./RegisterStep1";
import RegisterStep2 from "./RegisterStep2";
import RegisterStep3 from "./RegisterStep3";

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

  const router = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    specialty: "",
    bio: "",
    selectedSkills: [] as string[],
    portfolio: "",
    acceptTerms: false,
    newsletter: true,
  });

  const updateFormData = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.password &&
          formData.confirmPassword &&
          formData.username &&
          formData.password === formData.confirmPassword
        );
      case 2:
        return formData.specialty && formData.selectedSkills.length > 0;
      case 3:
        return formData.acceptTerms;
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

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setError("Por favor, acepta los términos y condiciones");
      return;
    }

    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      router("/dashboard");
    }, 2000);
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Palette className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold">CreativeHub</span>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Únete a CreativeHub</h1>
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
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Step 1: Personal Information */}
            <RegisterStep1
              currentStep={currentStep}
              formData={formData}
              updateFormData={updateFormData}
            />

            {/* Step 2: Professional Profile */}

            <RegisterStep2
              currentStep={currentStep}
              formData={formData}
              updateFormData={updateFormData}
            />

            <RegisterStep3
              currentStep={currentStep}
              formData={formData}
              updateFormData={updateFormData}
            />
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Anterior
              </Button>

              {currentStep < 3 ? (
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.acceptTerms}
                  className="flex items-center gap-2"
                >
                  {isLoading ? "Creando cuenta..." : "Crear cuenta"}
                  <Check className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-sm text-muted-foreground">
            ¿Ya tienes una cuenta?{" "}
          </span>
          <Link
            to="/auth/login"
            className="text-sm text-primary hover:underline font-medium"
          >
            Inicia sesión aquí
          </Link>
        </div>

        {/* Back to Home */}
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
