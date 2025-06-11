import { useFormContext, Controller } from "react-hook-form";
import { Card, CardContent } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function RegisterStep3({
  currentStep,
  avatarPreview,
}: {
  currentStep: number;
  avatarPreview?: string;
}) {
  const { watch, control } = useFormContext();

  // Si no es el paso 3 no renderizamos nada
  if (currentStep !== 3) return null;

  // Obtenemos los datos que queremos mostrar
  const firstName = watch("name");
  const lastName = watch("lastname");
  const username = watch("username");
  const specialty = watch("profession");
  const selectedSkills: string[] = watch("toolSkills") || [];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold">¡Casi terminamos!</h3>
        <p className="text-muted-foreground">
          Solo faltan algunos detalles para completar tu registro
        </p>
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={avatarPreview || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">
                {firstName?.[0]}
                {lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h4 className="font-semibold">
                {firstName} {lastName}
              </h4>
              <p className="text-sm text-muted-foreground">@{username}</p>
              <p className="text-sm text-primary">{specialty}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedSkills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {selectedSkills.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{selectedSkills.length - 3} más
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Controller
            name="acceptTerms"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed">
            Acepto los{" "}
            <Link to="/terms" className="text-primary hover:underline">
              Términos y Condiciones
            </Link>{" "}
            y la{" "}
            <Link to="/privacy" className="text-primary hover:underline">
              Política de Privacidad
            </Link>{" "}
            de WorkShow
          </Label>
        </div>

        <div className="flex items-start space-x-2">
          <Controller
            name="acceptTerms"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="terms"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="newsletter" className="text-sm">
            Quiero recibir actualizaciones, consejos y ofertas especiales por
            email
          </Label>
        </div>
      </div>
    </div>
  );
}
