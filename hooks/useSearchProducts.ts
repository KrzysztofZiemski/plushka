import React, { useMemo } from "react";
import { useSearch } from "../context/search";
import { Product } from "../types/product";
import { productFilter } from "../utils/filter";

export default function useSearchProducts(products: Product[]) {
  const { search, setSearch } = useSearch();
  const filtered = useMemo(() => {
    if (search.length < 3) return [];

    return products
      .map((el) => ({ ...el, points: productFilter(el, search) }))
      .filter(({ points }) => points)
      .sort((a, b) => b.points - a.points);
  }, [search, products]);

  return { search, setSearch, filtered };
}
