import { supabase } from "@/utils/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("resource_id");

      if (error) {
        throw new Error(error.message);
      }
      return data.map((item) => item.resource_id);
    },
    staleTime: 1000 * 60 * 5, // cache data for 5 minutes
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resource_id: string) => {
      const { error } = await supabase
        .from("favorites")
        .insert({ resource_id });

      if (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resource_id: string) => {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("resource_id", resource_id);

      if (error) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
