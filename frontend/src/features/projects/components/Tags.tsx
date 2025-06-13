import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "../../../../src/components/ui/label";
import { Input } from "../../../../src/components/ui/input";
import { Badge } from "../../../../src/components/ui/badge";

export const TechnologiesInput = () => {
  const { setValue, watch } = useFormContext();
  const [techInput, setTechInput] = useState("");
  const technologies: string[] = watch("tecnologies") || [];

  const addTechnology = (tech: string) => {
    const trimmed = tech.trim().toLowerCase();
    if (!trimmed) return;
    if (technologies.includes(trimmed)) return;
    const newTechs = [...technologies, trimmed];
    setValue("tecnologies", newTechs, { shouldValidate: true });
    setTechInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology(techInput);
    }
  };

  const removeTechnology = (techToRemove: string) => {
    const filtered = technologies.filter((t) => t !== techToRemove);
    setValue("tecnologies", filtered, { shouldValidate: true });
  };

  return (
    <div>
      <Label htmlFor="tecnologies">Herramientas y/o Tecnologias</Label>
      <Input
        id="tecnologies"
        value={techInput}
        onChange={(e) => setTechInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Escribe una tecnología y presiona Enter"
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            className="cursor-pointer bg-primary text-amber-50 rounded-2xl flex gap-1 "
          >
            {tech}
            <Badge className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              <p
                aria-label={`Eliminar tecnología ${tech}`}
                onClick={() => removeTechnology(tech)}
                className="hover:text-red-600 "
              >
                x
              </p>
            </Badge>
          </Badge>
        ))}
      </div>
    </div>
  );
};
