"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Separator } from "../../../components/ui/separator"
import { Checkbox } from "../../../components/ui/checkbox"
import { Badge } from "../../../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Alert, AlertDescription } from "../../../components/ui/alert"
import { Progress } from "../../../components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
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
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const steps = [
  { id: 1, title: "Información Personal", description: "Datos básicos de tu cuenta" },
  { id: 2, title: "Perfil Profesional", description: "Tu especialidad y habilidades" },
  { id: 3, title: "Configuración", description: "Últimos detalles" },
]

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
]

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
]

export default function RegisterPage2() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [avatarPreview, setAvatarPreview] = useState("")
  const router = useNavigate()

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
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSkillToggle = (skill: string) => {
    const newSkills = formData.selectedSkills.includes(skill)
      ? formData.selectedSkills.filter((s) => s !== skill)
      : [...formData.selectedSkills, skill]
    updateFormData("selectedSkills", newSkills)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
        )
      case 2:
        return formData.specialty && formData.selectedSkills.length > 0
      case 3:
        return formData.acceptTerms
      default:
        return false
    }
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3))
      setError("")
    } else {
      setError("Por favor, completa todos los campos requeridos")
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    setError("")
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) {
      setError("Por favor, acepta los términos y condiciones")
      return
    }

    setIsLoading(true)
    // Simulate registration
    setTimeout(() => {
      router("/dashboard")
    }, 2000)
  }

  const handleSocialRegister = (provider: string) => {
    setIsLoading(true)
    setTimeout(() => {
      router("/dashboard")
    }, 1500)
  }

  const progress = (currentStep / 3) * 100

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
          <p className="text-muted-foreground">Crea tu cuenta y comienza a mostrar tu talento</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <div>
                <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
                <CardDescription>{steps[currentStep - 1].description}</CardDescription>
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
            {currentStep === 1 && (
              <div className="space-y-4">
                {/* Social Registration */}
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground text-center">Regístrate rápidamente con:</p>
                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" onClick={() => handleSocialRegister("google")} disabled={isLoading}>
                      <Chrome className="h-4 w-4 mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" onClick={() => handleSocialRegister("github")} disabled={isLoading}>
                      <Github className="h-4 w-4 mr-2" />
                      GitHub
                    </Button>
                    <Button variant="outline" onClick={() => handleSocialRegister("linkedin")} disabled={isLoading}>
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">O completa el formulario</span>
                  </div>
                </div>

                {/* Personal Info Form */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre *</Label>
                    <Input
                      id="firstName"
                      placeholder="Tu nombre"
                      value={formData.firstName}
                      onChange={(e) => updateFormData("firstName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido *</Label>
                    <Input
                      id="lastName"
                      placeholder="Tu apellido"
                      value={formData.lastName}
                      onChange={(e) => updateFormData("lastName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData("email", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="username">Nombre de usuario *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      placeholder="tu_usuario"
                      value={formData.username}
                      onChange={(e) => updateFormData("username", e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Este será tu URL: creativehub.com/{formData.username || "tu_usuario"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => updateFormData("password", e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                        className="pl-10 pr-10"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>

                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <Alert variant="destructive">
                    <AlertDescription>Las contraseñas no coinciden</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Step 2: Professional Profile */}
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
                    <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
                  </div>
                  <p className="text-sm text-muted-foreground">Sube tu foto de perfil (opcional)</p>
                </div>

                {/* Specialty */}
                <div className="space-y-2">
                  <Label htmlFor="specialty">Especialidad principal *</Label>
                  <Select value={formData.specialty} onValueChange={(value) => updateFormData("specialty", value)}>
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
                  <p className="text-xs text-muted-foreground">{formData.bio.length}/500 caracteres</p>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <Label>Habilidades y herramientas *</Label>
                  <p className="text-sm text-muted-foreground">Selecciona al menos 3 habilidades que domines</p>
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border rounded-lg">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant={formData.selectedSkills.includes(skill) ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                        onClick={() => handleSkillToggle(skill)}
                      >
                        {formData.selectedSkills.includes(skill) && <Check className="h-3 w-3 mr-1" />}
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Seleccionadas: {formData.selectedSkills.length}</p>
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

            {/* Step 3: Configuration */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">¡Casi terminamos!</h3>
                  <p className="text-muted-foreground">Solo faltan algunos detalles para completar tu registro</p>
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
                        <p className="text-sm text-muted-foreground">@{formData.username}</p>
                        <p className="text-sm text-primary">{formData.specialty}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.selectedSkills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs">
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
                      onCheckedChange={(checked) => updateFormData("acceptTerms", checked)}
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
                      onCheckedChange={(checked) => updateFormData("newsletter", checked)}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Quiero recibir actualizaciones, consejos y ofertas especiales por email
                    </Label>
                  </div>
                </div>
              </div>
            )}

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
          <span className="text-sm text-muted-foreground">¿Ya tienes una cuenta? </span>
          <Link to="/auth/login" className="text-sm text-primary hover:underline font-medium">
            Inicia sesión aquí
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
