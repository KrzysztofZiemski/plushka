import { Category } from "./category";

export interface ProductColor {
  colorName: string;
  colorValue: {
    hex: string;
  };
}
export interface ProductPhoto {
  id: string;
  alt: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  colors: ProductColor[];
  tags: string;
  photos: ProductPhoto[];
  categories: Category[];
  textDescription: string;
  slugName: string;
}
