import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

import { Plus, Upload } from "lucide-react";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

function CreateButton() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  return (
    <div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Crear Proyecto
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
            <DialogDescription>
              Comparte tu trabajo con la comunidad de CreativeHub
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título del Proyecto</Label>
              <Input id="title" placeholder="Ej: Diseño de App Móvil" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                placeholder="Describe tu proyecto..."
                className="min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Imagen del Proyecto</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">
                  Arrastra una imagen o haz clic para subir
                </p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="demo-url">URL de Demo (opcional)</Label>
              <Input id="demo-url" placeholder="https://..." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="React, UI/UX, Mobile..." />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(false)}>
              Publicar Proyecto
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateButton;
