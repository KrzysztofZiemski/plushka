import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Favourite } from "../types/favourite";

interface FavouritesContex {
  favourites: Favourite[];
  setFavourites: Dispatch<React.SetStateAction<Favourite[]>>;
}

const FavouritesContext = createContext<FavouritesContex>({
  favourites: [],
  setFavourites: () => {},
});

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  return (
    <FavouritesContext.Provider value={{ favourites, setFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};
