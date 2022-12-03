import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useState,
} from "react";

interface SearchContex {
  search: string;
  setSearch: Dispatch<React.SetStateAction<string>>;
}

const SearchContext = createContext<SearchContex>({
  search: "",
  setSearch: () => {},
});

export const useSearch = () => {
  return useContext<{
    search: string;
    setSearch: Dispatch<React.SetStateAction<string>>;
  }>(SearchContext);
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
