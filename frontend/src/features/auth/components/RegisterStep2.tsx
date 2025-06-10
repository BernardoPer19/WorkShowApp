import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Upload, Check } from "lucide-react";
import { useState } from "react";

const specialties = [
  "UI/UX Designer",
  "Web Developer",
  "Mobile Developer",
  "Graphic Designer",
  "Brand Designer",
  "Photographer",
  "Illustrator",
  "Video Editor",
  "3D Artist",
  "Copywriter",
  "Content Writer",
  "Music Producer",
  "Sound Designer",
];

const skills = [
  "Figma",
  "Sketch",
  "Adobe XD",
  "Photoshop",
  "Illustrator",
  "After Effects",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "JavaScript",
  "TypeScript",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "Unity",
  "Unreal Engine",
  "Blender",
  "Cinema 4D",
  "Maya",
  "3ds Max",
  "Substance Painter",
  "WordPress",
  "Shopify",
  "Webflow",
  "Framer",
  "Principle",
];

type RegisterStep2Props = {
  currentStep: number
  formData: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    username: string
    specialty: string
    bio: string
    selectedSkills: string[]
    portfolio: string
    acceptTerms: boolean
    newsletter: boolean
    [key: string]: unknown
  }
  updateFormData: (field: string, value: unknown) => void
}

function RegisterStep2({
  currentStep,
  formData,
  updateFormData,
}: RegisterStep2Props) {
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = formData.selectedSkills.includes(skill)
      ? formData.selectedSkills.filter((s) => s !== skill)
      : [...formData.selectedSkills, skill];
    updateFormData("selectedSkills", newSkills);
  };

  return (
    <div>
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {formData.firstName[0]}
                  {formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Label
                htmlFor="avatar"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90"
              >
                <Upload className="h-4 w-4" />
              </Label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Sube tu foto de perfil (opcional)
            </p>
          </div>

          {/* Specialty */}
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidad principal *</Label>
            <Select
              value={formData.specialty}
              onValueChange={(value) => updateFormData("specialty", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu especialidad" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Biografía profesional</Label>
            <Textarea
              id="bio"
              placeholder="Cuéntanos sobre ti, tu experiencia y lo que te apasiona..."
              value={formData.bio}
              onChange={(e) => updateFormData("bio", e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {formData.bio.length}/500 caracteres
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-3">
            <Label>Habilidades y herramientas *</Label>
            <p className="text-sm text-muted-foreground">
              Selecciona al menos 3 habilidades que domines
            </p>
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant={
                    formData.selectedSkills.includes(skill)
                      ? "default"
                      : "outline"
                  }
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {formData.selectedSkills.includes(skill) && (
                    <Check className="h-3 w-3 mr-1" />
                  )}
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Seleccionadas: {formData.selectedSkills.length}
            </p>
          </div>

          {/* Portfolio URL */}
          <div className="space-y-2">
            <Label htmlFor="portfolio">URL de tu portfolio (opcional)</Label>
            <Input
              id="portfolio"
              type="url"
              placeholder="https://tu-portfolio.com"
              value={formData.portfolio}
              onChange={(e) => updateFormData("portfolio", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RegisterStep2;
