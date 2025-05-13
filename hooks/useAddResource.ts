import { Resource } from "@/context/ResourcesContext";
import { supabase } from "@/utils/supabase";
// useMutation: used to run create/update/delete actions (e.g., "add new resource"); You use it when you want to send data (not just fetch it).
// useQueryClient: gives access to React Query’s cache so you can update or refresh it after a mutation.
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newResource: Resource) => {
            const { data, error } = await supabase
                .from("resources")
                .insert(newResource);
            if (error) {
                throw new Error(error.message)
            }
            return data
        },
        onSuccess: () => {
            // You tell React Query: "Refresh the cached data for 'resources'".
            // This makes your app show the latest list (with the new resource added).
            queryClient.invalidateQueries({ queryKey: ['resources']})
        }
    })
}