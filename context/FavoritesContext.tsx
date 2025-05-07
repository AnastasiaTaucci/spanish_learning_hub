import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

type Favorite = {
  title: string;
  description: string;
  group: string;
  link: string;
};

type FavoritesContextType = {
  favorites: Favorite[];
  addFavorite: (item: Favorite) => void;
  removeFavorite: (title: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

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

  function addFavorite(item: Favorite) {
    setFavorites((prev) => [...prev, item]);
  }

  function removeFavorite(title: string) {
    setFavorites((prev) => prev.filter((item) => item.title !== title));
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
