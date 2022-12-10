type Path = "product-detail" | "category" | "favourites";

const paths = {
  "product-detail": (slugName: string) => `/details/${slugName}`,
  category: (slugCategory: string) => `/${slugCategory}`,
  favourites: () => "/favourites",
};

export const getPath = (path: Path) => {
  return paths[path];
};
