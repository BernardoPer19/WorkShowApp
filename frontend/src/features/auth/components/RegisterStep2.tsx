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
import type { UseFormReturn } from "react-hook-form";
import type { RegisterType } from "../schema/AuthSchema";

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
  currentStep: number;
  form: UseFormReturn<RegisterType>;
};

export default function RegisterStep2({
  currentStep,
  form,
}: RegisterStep2Props) {
  const { watch, setValue } = form;

  const avatarPreview = watch("avatar_url") as string;
  const specialty = watch("profession") as string;
  const bio = watch("bio") as string;
  const portfolio = watch("portafolio_url") as string;
  const selectedSkills = (watch("tecnologies") as string[]) || [];

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setValue("avatar_url", e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setValue("tecnologies", newSkills, { shouldValidate: true });
  };

  return (
    <>
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* Avatar Upload */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {/* Puede ser mejor mostrar iniciales de form.watch("name") */}
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
            <Label htmlFor="profession">Especialidad principal *</Label>
            <Select
              value={specialty}
              onValueChange={(value) =>
                setValue("profession", value, { shouldValidate: true })
              }
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
              placeholder="Cuéntanos sobre ti..."
              value={bio}
              onChange={(e) => setValue("bio", e.target.value)}
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {bio?.length || 0}/500 caracteres
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
                    selectedSkills.includes(skill) ? "default" : "outline"
                  }
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => handleSkillToggle(skill)}
                >
                  {selectedSkills.includes(skill) && (
                    <Check className="h-3 w-3 mr-1" />
                  )}
                  {skill}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Seleccionadas: {selectedSkills.length}
            </p>
          </div>

          {/* Portfolio URL */}
          <div className="space-y-2">
            <Label htmlFor="portafolio_url">
              URL de tu portfolio (opcional)
            </Label>
            <Input
              id="portafolio_url"
              type="url"
              placeholder="https://tu-portfolio.com"
              value={portfolio}
              onChange={(e) => setValue("portafolio_url", e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
}
