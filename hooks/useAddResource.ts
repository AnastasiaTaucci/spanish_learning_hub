import { Resource } from "@/context/ResourcesContext";
import { supabase } from "@/utils/supabase";
// useMutation: used to run create/update/delete actions (e.g., "add new resource"); You use it when you want to send data (not just fetch it).
// useQueryClient: gives access to React Query’s cache so you can update or refresh it after a mutation.
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Utilitze the Omit utility type to create a new type that excludes the 'id' property, because supabase controls them by itself
// https://www.geeksforgeeks.org/typescript-omittype-keys-utility-type/
// Supabase Restaurant TypeMatch
export type SupabaseNewResource = Omit<Resource, 'id'>;

export function useAddResource() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newResource: SupabaseNewResource) => {
            const { error } = await supabase
                .from("resources")
                .insert(newResource);
            if (error) {
                throw new Error(error.message)
            }
        },
        onSuccess: () => {
            // You tell React Query: "Refresh the cached data for 'resources'".
            // This makes your app show the latest list (with the new resource added).
            queryClient.invalidateQueries({ queryKey: ['resources']})
        },
        onError: (error) => {
            console.error("Failed to add resource:", error.message);
          }
    })
}