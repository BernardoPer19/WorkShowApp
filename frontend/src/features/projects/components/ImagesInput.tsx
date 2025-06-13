import React, { useState, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { Label } from "../../../../src/components/ui/label";
import { Input } from "../../../../src/components/ui/input";
import { Badge } from "../../../../src/components/ui/badge";
import { Upload } from "lucide-react";

export const ImagesInput = () => {
  const { setValue, watch } = useFormContext();
  const [imageInput, setImageInput] = useState("");
  const images: string[] = watch("images") || [];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Agrega imagen desde input de texto (URL)
  const addImage = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) return;
    if (images.includes(trimmed)) return;
    setValue("images", [...images, trimmed], { shouldValidate: true });
    setImageInput("");
  };

  // Maneja Enter en input texto
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addImage(imageInput);
    }
  };

  // Quitar imagen de la lista
  const removeImage = (urlToRemove: string) => {
    setValue(
      "images",
      images.filter((img) => img !== urlToRemove),
      {
        shouldValidate: true,
      }
    );
  };

  // Abrir selector de archivo al clickear el cuadro
  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  // Procesar archivo seleccionado
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Para cada archivo, crear URL local y agregar
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      if (!images.includes(url)) {
        setValue("images", [...images, url], { shouldValidate: true });
      }
    });

    // Limpia el input para permitir seleccionar el mismo archivo otra vez si quiere
    e.target.value = "";
  };

  return (
    <div>
      <Label htmlFor="images">URLs de Imágenes</Label>
      <Input
        id="images"
        value={imageInput}
        onChange={(e) => setImageInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Pega una URL y presiona Enter"
      />

      <div
        onClick={handleBoxClick}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center h-40 cursor-pointer flex flex-col justify-center items-center"
      >
        {images[0] ? (
          // Si hay imagen destacada, mostrarla con estilo
          <img
            src={images[0]}
            alt="Imagen Destacada"
            className="max-h-full max-w-full object-contain rounded"
          />
        ) : (
          // Si no hay imagen, mostrar icono + texto
          <>
            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">
              Arrastra o haz clic para subir
            </p>
          </>
        )}
      </div>

      {/* Input file oculto */}
      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {images.map((url, index) => (
          <Badge
            key={url + index}
            className="cursor-pointer bg-primary text-amber-50 rounded-2xl flex gap-1 "
          >
            <p className="max-w-64">{url}</p>
            <Badge className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
              <p
                aria-label={`Eliminar imagen ${url}`}
                onClick={() => removeImage(url)}
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
