import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";

import { Button } from "../../../../src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../src/components/ui/dialog";
import { projectSchema } from "../schema/ProjectSchema";
import { ProjectForm } from "./CreateForm";

function CreateButton() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      demo_url: "",
      tecnologies: [],
      duration: "",
      desCorta: "",
      images: [],
    },
  });

  return (
    <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Crear Proyecto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
          <DialogDescription>
            Comparte tu trabajo con la comunidad de CreativeHub
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...form}>
          <ProjectForm onCancel={() => setIsCreateDialogOpen(false)} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

export default CreateButton;
