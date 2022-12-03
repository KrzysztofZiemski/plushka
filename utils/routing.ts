import slugify from "slugify";
import { ProductCategory } from "../types/product";

type Path = "product-detail" | "category";

const paths = {
  "product-detail": (name: string) => `/details/${slugify(name)}`,
  category: (categoryName: string) => `/${slugify(categoryName)}`,
};

export const getPath = (path: Path) => {
  return paths[path];
};

const categories: Record<string, ProductCategory> = {};
Object.values(ProductCategory).forEach(
  (category) => (categories[slugify(category)] = category)
);

export const categoriesSlugs = categories;
