import slugify from "slugify";

type Path = "product-detail" | "category";

const paths = {
  "product-detail": (name: string) => `/details/${slugify(name)}`,
  category: (categoryName: string) => `/${slugify(categoryName)}`,
};

export const getPath = (path: Path) => paths[path];
