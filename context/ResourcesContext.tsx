import { createContext, useState, useContext } from "react";
import spanishLinks from '@/data/spanish_links.json'

export type Resource = {
    title: string;
    group: string;
    description: string;
    link: string;
}

type ResourceContextType = {
    resources: Resource[];
    addResource: (resource: Resource) => void;
    updateResource: (title: string, updatedResource: Partial<Resource>) => void;
    toggleFavorite: (title: string) => void;
}

const ResourceContext =createContext<ResourceContextType | undefined>(undefined);

export const ResourceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [resources, setResources] = useState<Resource[]>(spanishLinks as Resource[]);

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

    const toggleFavorite = (title: string) => {
        setResources((prev) =>
            prev.map((resources) =>
                resources.title === title ? { ...resources, isFavorite: !resources.isFavorite } : resources
            )
        );
    };

    return (
        <ResourceContext.Provider value={{ resources, addResource, updateResource, toggleFavorite }}>
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