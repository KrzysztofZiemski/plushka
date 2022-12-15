import React, {
  createContext,
  Dispatch,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Favourite } from "../types/favourite";
import { ProductDatoCms, ProductColor, Product } from "../types/product";
import { LocalStorageManager } from "../utils/localstorage";

interface FavouritesContex {
  favourites: Favourite[];
  remove: (i: Product) => void;
  add: (i: Product) => void;
  toggle: (i: Product) => void;
}
const validator = (data: Favourite[]) => {
  if (!data || !Array.isArray(data)) return false;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (typeof item.idProduct !== "string") return false;
    if (typeof item.addedDate !== "string") return false;
  }

  return true;
};
const localStorageManager = new LocalStorageManager<Favourite[]>(
  "favourites",
  validator
);

const FavouritesContext = createContext<FavouritesContex>({
  favourites: [],
  remove: () => {},
  add: () => {},
  toggle: () => {},
});

export const useFavourites = () => {
  return useContext(FavouritesContext);
};

export const FavouriteProvider = ({ children }: { children: ReactNode }) => {
  const [favourites, setFavourites] = useState<Favourite[]>([]);

  useEffect(() => {
    const state = localStorageManager.state;
    if (state) setFavourites(state);
  }, []);

  useEffect(() => {
    localStorageManager.save(favourites);
  }, [favourites]);

  const add = useCallback(
    (item: Product) => {
      setFavourites((prev) => [
        { addedDate: new Date().toISOString(), idProduct: item.id },
        ...prev,
      ]);
    },
    [setFavourites]
  );
  const remove = useCallback(
    (item: Product) => {
      setFavourites((prev) =>
        prev.filter((favouriteItem) => favouriteItem.idProduct !== item.id)
      );
    },
    [setFavourites]
  );
  const toggle = useCallback(
    (item: Product) => {
      const find = favourites.find((fav) => fav.idProduct === item.id);
      if (find) return remove(item);
      return add(item);
    },
    [favourites, remove, add]
  );
  return (
    <FavouritesContext.Provider value={{ favourites, remove, add, toggle }}>
      {children}
    </FavouritesContext.Provider>
  );
};
