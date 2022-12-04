import { ProductCategory } from "../types/product";

type Path = "product-detail" | "category";

const paths = {
  "product-detail": (slugName: string) => `/details/${slugName}`,
  category: (slugCategory: string) => `/${slugCategory}`,
};

export const getPath = (path: Path) => {
  return paths[path];
};

export const categoriesSlugs = {
  [ProductCategory.jewelery]: "bizuteria",
  [ProductCategory.plushToys]: "maskotki",
  [ProductCategory.scarves]: "chusty",
};
