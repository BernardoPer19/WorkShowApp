import { UseFormRegister, FieldErrors, UseFormWatch, UseFormSetValue } from "react-hook-form";

export type RegisterStep1Props = {
    currentStep: number;
    register: UseFormRegister<RegisterFormData>;
    errors: FieldErrors<RegisterFormData>;
    watch: UseFormWatch<RegisterFormData>;
    setValue: UseFormSetValue<RegisterFormData>;
};
