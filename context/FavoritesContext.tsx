import { createContext, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAddFavorite, useGetFavorites, useRemoveFavorite } from '@/hooks/useFavorites';

type FavoritesContextType = {
  favorites: string[];
  addFavorite: (resourceId: string) => void;
  removeFavorite: (resourceId: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  //object destructuring - take the data field from the object returned by useGetFavorites(), rename it to favorites, and if it's undefined, set it to an empty array
  const {data: favorites = []} = useGetFavorites();


  const addFavoriteMutation = useAddFavorite();
  const removeFavoriteMutation = useRemoveFavorite();

  // useEffect(() => {
  //   const fetchData = async() => {
  //     try {
  //       const jsonValue = await AsyncStorage.getItem("Favorites");
  //       const storageFavorites = jsonValue != null ? JSON.parse(jsonValue) : null;

  //       if (storageFavorites && storageFavorites.length) {
  //         setFavorites(storageFavorites)
  //       } else {
  //         setFavorites([])
  //       }
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }

  //   fetchData();
  // }, []);

  useEffect(() => {
    const storeData = async () => {
      try{
        const jsonValue = JSON.stringify(favorites)
        await AsyncStorage.setItem("Favorites", jsonValue)
      } catch (e) {
        console.error(e);
      }
    }

    storeData()
  }, [favorites])

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
