const paths = {
  "product-detail": (slugName: string) => `/details/${slugName}`,
  category: (slugCategory: string) => `/${slugCategory}`,
  favourites: () => "/favourites",
  privacy: () => "/privacy",
  contact: (productId: string) =>
    `/contact${productId ? `?product=${productId}` : ""}`,
} as const;

export const getPath = (path: keyof typeof paths) => {
  return paths[path];
};
