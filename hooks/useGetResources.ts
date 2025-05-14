import { supabase } from "@/utils/supabase"
import { useQuery } from "@tanstack/react-query";

export default function useGetResources () {
    return useQuery({
        queryKey: ['resources'],        // name for the query (used for caching)
        queryFn: async () => {          // function that fetches data
            const { data, error } = await supabase
                .from('resources')
                .select('*')
                .order("created_at", { ascending: false })
            if (error) {
                throw new Error(error.message)
            }
            return data;
        },
        staleTime: 1000 * 60 *5, // cache data for 5 minutes
    })
}