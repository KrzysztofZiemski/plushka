import React, { ReactNode } from "react";
import { FavouriteProvider } from "./favourites";
import { SearchProvider } from "./search";

export default function ContextProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SearchProvider>
      <FavouriteProvider>{children}</FavouriteProvider>
    </SearchProvider>
  );
}
