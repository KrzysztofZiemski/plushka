type Path = "product-detail" | "category";

const paths = {
  "product-detail": (slugName: string) => `/details/${slugName}`,
  category: (slugCategory: string) => `/${slugCategory}`,
};

export const getPath = (path: Path) => {
  return paths[path];
};
