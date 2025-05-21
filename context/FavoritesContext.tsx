import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAddFavorite, useGetFavorites, useRemoveFavorite } from '@/hooks/useFavorites';
import { useResourceContext } from '@/context/ResourcesContext'

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (resourceId: string) => void;
  removeFavorite: (resourceId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { resources } = useResourceContext();
  const [favorites, setFavorites] = useState<string[]>([]);
  //object destructuring - take the data field from the object returned by useGetFavorites(), rename it to favorites, and if it's undefined, set it to an empty array
  const { data, isFetching } = useGetFavorites();


  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  // load cached favorites from AsyncStorage on app launch
  useEffect(() => {
    const fetchData = async() => {
      try {
        const jsonValue = await AsyncStorage.getItem("Favorites");
        const storageFavorites = jsonValue != null ? JSON.parse(jsonValue) : null;

        if (storageFavorites && storageFavorites.length) {
          setFavorites(storageFavorites)
        } else {
          setFavorites([])
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchData();
  }, []);

  // once fresh data is available from Supabase, update state and AsyncStorage
  useEffect(() => {
    if (data && !isFetching && resources) {
      // update state with fresh data
      console.log("Favorites are succesfully fetched.");
      setFavorites(data as string[]);

      const fullFavorites = resources.filter(resource => data.includes(resource.id));

      // cache the fresh data
      try{
        const jsonValue = JSON.stringify(fullFavorites);
        AsyncStorage.setItem("Favorites", jsonValue)
      } catch (e) {
        console.error(e);
      }
    }
    if (isFetching) {
      console.log("Fetching favorites...");
    }

  }, [data, isFetching, resources])

  
  // functions to update supabase when a favorite is deleted or added
  function addFavorite(resourceId: string) {
    addFavoriteMutation.mutate(resourceId);
  }

  function removeFavorite(resourceId: string) {
    removeFavoriteMutation.mutate(resourceId);
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavoritesContext must be used within a FavoritesProvider');
  }
  return context;
}
