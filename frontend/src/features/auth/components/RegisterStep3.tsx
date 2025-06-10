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

interface RegisterStep3Props {
  currentStep: number;
  formData: {
    firstName: string;
    lastName: string;
    username: string;
    specialty: string;
    selectedSkills: string[];
    acceptTerms: boolean;
    newsletter: boolean;
    // Add any other fields present in formData
  };
  updateFormData: (field: string, value: unknown) => void;
  avatarPreview?: string;
}

function RegisterStep3({
  currentStep,
  formData,
  updateFormData,
  avatarPreview,
}: RegisterStep3Props) {
  return (
    <div>
      {currentStep === 3 && (
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

          {/* Profile Summary */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">
                    {formData.firstName} {formData.lastName}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    @{formData.username}
                  </p>
                  <p className="text-sm text-primary">{formData.specialty}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.selectedSkills.slice(0, 3).map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {formData.selectedSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{formData.selectedSkills.length - 3} más
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) =>
                  updateFormData("acceptTerms", checked)
                }
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
                de CreativeHub
              </Label>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) =>
                  updateFormData("newsletter", checked)
                }
              />
              <Label htmlFor="newsletter" className="text-sm">
                Quiero recibir actualizaciones, consejos y ofertas especiales
                por email
              </Label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterStep3;
