const paths = {
  "product-detail": (slugName: string) => `/details/${slugName}`,
  category: (slugCategory: string) => `/${slugCategory}`,
  favourites: () => "/favourites",
  privacy: () => "/privacy",
  contact: () => "/contact",
} as const;

export const getPath = (path: keyof typeof paths) => {
  return paths[path];
};
