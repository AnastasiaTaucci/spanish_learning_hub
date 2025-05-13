import { SupabaseNewResource, useAddResource } from "@/hooks/useAddResource";
import useDeleteResource from "@/hooks/useDeleteResource";
import useGetResources from "@/hooks/useGetResources";
import useUpdateResource from "@/hooks/useUpdateResource";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sortRoutes } from "expo-router/build/sortRoutes";
import { createContext, useContext, useEffect, useState } from "react";

export type Resource = {
    title: string;
    group: string;
    description: string;
    link: string;
    id: string;
}

type ResourceContextType = {
    isLoading: boolean;
    resources: Resource[];
    addResource: (resource: SupabaseNewResource) => void;
    deleteResource: (id: string) => void;
    updateResource: (updatedResource: Resource) => void;
}

const ResourceContext =createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {data, isFetching} = useGetResources();
    const addResourceMutation = useAddResource();
    const deleteResourceMutation = useDeleteResource();    
    const updateResourceMutation = useUpdateResource();    
    const [resources, setResources] = useState<Resource[]>();

    const addResource = async (resource: SupabaseNewResource) => {
        addResourceMutation.mutate(resource);
    };

    const deleteResource = async (id: string,) => {
        deleteResourceMutation.mutate(id)
    };

    const updateResource = (updatedResource: Resource) => {
        updateResourceMutation.mutate(updatedResource);
    };

    // load saved data on initial load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem("Resources");
                const storageResources = jsonValue != null ? JSON.parse(jsonValue) : null;

                if (storageResources && storageResources.length) {
                    setResources(storageResources)
                } 
                
            } catch (error) {
                console.error("Failed to load cached resources", error);
            }
        };

        fetchData();
    }, [])

    // Save fresh Supabase data and update state
    useEffect(() => {
        if (data && !isFetching) {
            // console.log("Fetched data: ", data);
            setResources(data as Resource[]);

            try{
                const jsonValue = JSON.stringify(data)
                AsyncStorage.setItem("Resources", jsonValue)
            } catch (error) {
                console.error("Failed to cache resources", error)
            }
        } 
        if (isFetching) {
            console.log("Fetching data...");
        }
    }, [data, isFetching])

    return (
        <ResourceContext.Provider value={{ isLoading:isFetching, resources, addResource, deleteResource, updateResource }}>
            {children}
        </ResourceContext.Provider>
    );
}

export const useResourceContext = () => {
    const context = useContext(ResourceContext);
    if (!context) {
        throw new Error("useResourceContext must be used within a ResourceProvider");
    }
    return context;
};