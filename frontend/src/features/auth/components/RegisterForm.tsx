import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { z } from "zod";
import { UserSchema } from "../schema/AuthSchema";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

// Extendemos el UserSchema para incluir confirmación
const RegisterSchema = UserSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type RegisterFormType = z.infer<typeof RegisterSchema>;

export const RegisterForm = () => {
  const {
    register: {
      registerMutate,
      registerError,
      isRegisterError,
      isRegisterPending,
      resetRegister,
    },
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormType) => {
    registerMutate({
      username: data.username,
      email: data.email,
      password: data.password,
      profession: data.profession,
    });
  };

  useEffect(() => {
    return () => resetRegister();
  }, [resetRegister]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-semibold text-indigo-700 text-center mb-6">
        Crear una cuenta
      </h2>

      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Usuario
        </label>
        <input
          id="username"
          {...register("username")}
          placeholder="Tu nombre de usuario"
          className={`w-full rounded-xl px-4 py-3 border transition focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${
              errors.username
                ? "border-red-500 focus:ring-red-500 shadow-sm"
                : "border-gray-300"
            }`}
          aria-invalid={errors.username ? "true" : "false"}
          aria-describedby={errors.username ? "username-error" : undefined}
        />
        {errors.username && (
          <p
            id="username-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.username.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="email"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          placeholder="tucorreo@ejemplo.com"
          className={`w-full rounded-xl px-4 py-3 border transition focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${
              errors.email
                ? "border-red-500 focus:ring-red-500 shadow-sm"
                : "border-gray-300"
            }`}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p
            id="email-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="profession"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Profesión
        </label>
        <input
          id="profession"
          {...register("profession")}
          placeholder="Tu profesión"
          className={`w-full rounded-xl px-4 py-3 border transition focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${
              errors.profession
                ? "border-red-500 focus:ring-red-500 shadow-sm"
                : "border-gray-300"
            }`}
          aria-invalid={errors.profession ? "true" : "false"}
          aria-describedby={errors.profession ? "profession-error" : undefined}
        />
        {errors.profession && (
          <p
            id="profession-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.profession.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          placeholder="******"
          className={`w-full rounded-xl px-4 py-3 border transition focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${
              errors.password
                ? "border-red-500 focus:ring-red-500 shadow-sm"
                : "border-gray-300"
            }`}
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby={errors.password ? "password-error" : undefined}
        />
        {errors.password && (
          <p
            id="password-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="confirmPassword"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Confirmar contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          placeholder="Repite tu contraseña"
          className={`w-full rounded-xl px-4 py-3 border transition focus:outline-none focus:ring-2 focus:ring-indigo-500
            ${
              errors.confirmPassword
                ? "border-red-500 focus:ring-red-500 shadow-sm"
                : "border-gray-300"
            }`}
          aria-invalid={errors.confirmPassword ? "true" : "false"}
          aria-describedby={
            errors.confirmPassword ? "confirmPassword-error" : undefined
          }
        />
        {errors.confirmPassword && (
          <p
            id="confirmPassword-error"
            className="mt-1 text-sm text-red-600"
            role="alert"
          >
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isRegisterPending}
        className={`w-full rounded-xl py-3 font-semibold text-white transition
          ${
            isRegisterPending
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        aria-busy={isRegisterPending}
      >
        {isRegisterPending ? "Registrando..." : "Registrarse"}
      </button>

      {isRegisterError && (
        <p className="text-center text-red-600 font-medium mt-2">
          {registerError?.message || "Error al registrar"}
        </p>
      )}
      <p className="">
        Ya tienes cuenta? <Link to={"/auth/login"}><span className="text-indigo-600">Inicia sesion</span></Link>
      </p>
    </form>
  );
};
