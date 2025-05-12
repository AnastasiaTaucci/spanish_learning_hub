import useGetResources from "@/hooks/useGetResources";
import { createContext, useState, useContext, useEffect } from "react";

export type Resource = {
    title: string;
    group: string;
    description: string;
    link: string;
}

type ResourceContextType = {
    isLoading: boolean;
    resources: Resource[];
    addResource: (resource: Resource) => void;
    updateResource: (title: string, updatedResource: Partial<Resource>) => void;
}

const ResourceContext =createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const {data, isFetching} = useGetResources();
    const [resources, setResources] = useState<Resource[]>();

    const addResource = (resource: Resource) => {
        setResources((prev) => [...prev, resource]);
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
        <ResourceContext.Provider value={{ isLoading:isFetching, resources, addResource, updateResource }}>
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