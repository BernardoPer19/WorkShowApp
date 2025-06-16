import { useFormContext } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../src/components/ui/select";

import { Button } from "../../../../src/components/ui/button";
import { Input } from "../../../../src/components/ui/input";
import { Label } from "../../../../src/components/ui/label";
import { Textarea } from "../../../../src/components/ui/textarea";

import { useProject } from "../hooks/useProjectsApi";
import type { projectSchemaType } from "../schema/ProjectSchema";
import { TechnologiesInput } from "./Tags";
import { ImagesInput } from "./ImagesInput";

interface ProjectFormProps {
  onCancel: () => void;
}

const categories = [
  { id: "94a3310c-3af3-401a-ab45-283879a620a3", name: "Arte" },
  { id: "c69765a1-6397-4db7-9231-2ec5670e5eab", name: "Fotografia" },
  { id: "efe56ecc-c7e5-4107-8056-83dec230a33a", name: "Moda" },
];

export const ProjectForm = ({ onCancel }: ProjectFormProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<projectSchemaType>();

  const { createProject } = useProject();

  const categoryValue = watch("category");

  const onSubmit = (data: projectSchemaType) => {
    console.log("Datos correctos:", data);
    createProject.mutate(data);
    onCancel();
  };

  const onError = (errors: any) => {
    console.log("Errores de validación:", errors);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Título */}
        <div>
          <Label htmlFor="title">Título del Proyecto</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Ej: App Móvil"
            className="mt-1"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">
              {errors.title.message?.toString()}
            </p>
          )}
        </div>

        {/* Descripción corta */}
        <div>
          <Label htmlFor="desCorta">Descripción corta</Label>
          <Input
            id="desCorta"
            {...register("desCorta")}
            placeholder="Resumen breve..."
            className="mt-1"
          />
          {errors.desCorta && (
            <p className="text-red-600 text-sm mt-1">
              {errors.desCorta.message?.toString()}
            </p>
          )}
        </div>

        {/* Categoría */}
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select
            onValueChange={(value) =>
              setValue("category", value, { shouldValidate: true })
            }
            defaultValue={categoryValue}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Selecciona una categoría" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && (
            <p className="text-red-600 text-sm mt-1">
              {errors.category.message?.toString()}
            </p>
          )}
        </div>

        {/* Tecnologías */}
        <TechnologiesInput />
        <div>
          <Label htmlFor="description">Descripción Detallada</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Describe tu proyecto..."
            className="h-[100px] mt-1"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>

        {/* URLs de Imágenes */}
        <ImagesInput />

        {/* Duración + Demo URL */}
        <div className="flex gap-4  h-fit">
          <div className="flex-1">
            <Label htmlFor="duration">Duración</Label>
            <Input
              id="duration"
              {...register("duration")}
              placeholder="Ej: 3 semanas"
              className="mt-1"
            />
            {errors.duration && (
              <p className="text-red-600 text-sm mt-1">
                {errors.duration.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="demo_url">Demo URL</Label>
            <Input
              id="demo_url"
              {...register("demo_url")}
              placeholder="https://..."
              className="mt-1"
            />
            {errors.demo_url && (
              <p className="text-red-600 text-sm mt-1">
                {errors.demo_url.message?.toString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Publicar Proyecto</Button>
      </div>
    </form>
  );
};
