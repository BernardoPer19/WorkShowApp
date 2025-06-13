// utils/api.ts
import { AxiosError, type AxiosRequestConfig } from "axios";
import axios from './axios'
import { toast } from "sonner";

type ConfigWithSuccess = AxiosRequestConfig & {
    successMessage?: string;
};

export const apiRequest = async <T>(
    config: ConfigWithSuccess
): Promise<T> => {
    try {
        const res = await axios(config);

        if (config.successMessage) {
            toast.success(config.successMessage);
        }

        return res.data;
    } catch (error) {
        console.log(error);
        
        if (error instanceof AxiosError && error.response) {
            const backendMessage =
                error.response.data?.errors || error.response.data?.message;

            // Si no es 401 (opcional, para evitar spam)
            if (error.response.status !== 401) {
                toast.error(backendMessage);
            }

            throw new Error(backendMessage);
        }

        toast.error("Error desconocido.");
        throw new Error("Error desconocido.");
    }
};
