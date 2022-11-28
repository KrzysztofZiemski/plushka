interface ProductColor {
  id: string;
  colorsBase: string;
}
interface ProductPhoto {
  id: string;
  alt: string;
  url: string;
}

type ProductCategory = "crocket" | "jewelery";

export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  productColors: ProductColor[];
  tags: string;
  photos: ProductPhoto[];
  category: ProductCategory;
}
