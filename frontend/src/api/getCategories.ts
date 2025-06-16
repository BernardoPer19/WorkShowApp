// AuthRequest.ts
import { apiRequest } from "../utils/api";

export const getCategories = async () => {
    return apiRequest({
        method: "get",
        url: "/project/categories",
    });
};
