import { useAddResource, SupabaseNewResource} from "@/hooks/useAddResource";
import useGetResources from "@/hooks/useGetResources";
import useDeleteResource from "@/hooks/useDeleteResource";
import { createContext, useState, useContext, useEffect } from "react";

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
    updateResource: (title: string, updatedResource: Partial<Resource>) => void;
}

const ResourceContext =createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {data, isFetching} = useGetResources();
    const addResourceMutation = useAddResource();
    const deleteResourceMutation = useDeleteResource();    
    const [resources, setResources] = useState<Resource[]>();

    const addResource = async (resource: SupabaseNewResource) => {
        addResourceMutation.mutate(resource);
    };

    const deleteResource = async (id: string,) => {
        deleteResourceMutation.mutate(id)
    };

    const updateResource = (title: string, updatedResources: Partial<Resource>) => {
        setResources((prev) =>
            prev.map((resources) =>
                resources.title === title ? { ...resources, ...updatedResources } : resources
            )
        );
    };

    useEffect(() => {
        if (data && !isFetching) {
            console.log("Fetched data: ", data);
            setResources(data as Resource[]);
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