import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";

export const useCategories = () => {
  return useQuery({
    queryKey: ["project"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 5, // cache de 5 minutos
    refetchOnWindowFocus: false,
  });
};
