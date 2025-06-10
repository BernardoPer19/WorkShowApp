import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { LoginSchema, type LoginType } from "../schema/AuthSchema";
import { Link, useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const {
    login: {
      loginMutate,
      loginError,
      loginReset,
      isLoginError,
      isLoginLoading,
    },
  } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginType) => {
    loginMutate(data, {
      onSuccess: () => {
        navigate("/profile");
      },
      onError: (error) => {
        console.error("Error al iniciar sesión:", error);
      },
    });
  };

  useEffect(() => {
    return () => {
      loginReset();
    };
  }, [loginReset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg space-y-8"
      noValidate
    >
      <h2 className="text-2xl font-semibold text-center text-indigo-700">
        Iniciar sesión
      </h2>

      <div className="flex flex-col">
        <label
          htmlFor="username"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="tucorreo@ejemplo.com"
          {...register("username")}
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
          placeholder="tucorreo@ejemplo.com"
          {...register("email")}
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
          htmlFor="password"
          className="mb-2 text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="******"
          {...register("password")}
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

      {isLoginError && (
        <p className="text-center text-red-600 font-medium">
          {loginError?.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoginLoading}
        className={`w-full rounded-xl py-3 font-semibold text-white transition 
          ${
            isLoginLoading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        aria-busy={isLoginLoading}
      >
        {isLoginLoading ? "Cargando..." : "Iniciar sesión"}
      </button>

      <div className="flex gap-3 flex-row-reverse">
        <p className="text-center text-sm text-gray-500">
          ¿Olvidaste tu contraseña?
          <a href="#" className="text-indigo-600 hover:underline">
            Recuperarla aquí
          </a>
        </p>
        <p className="text-center text-sm text-gray-500">
          No tienes cuenta?
          <Link to={"/auth/register"}>
            <span className="text-indigo-600">Registrate Aquí</span>
          </Link>
        </p>
      </div>
    </form>
  );
};
