import { CategoryDatoCms, Category } from "./category";

export interface ProductColorDatoCms {
  colorName: string;
  colorValue: {
    hex: string;
  };
}
export interface ProductColor {
  name: string;
  color: {
    hex: string;
  };
}

export interface ProductPhotoDatoCms {
  id: string;
  alt: string;
  url: string;
}
export interface ProductPhoto {
  width: number;
  size: number;
  url: string;
  height: number;
  fileName: string;
}
export interface ProductDatoCms {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  colors: ProductColorDatoCms[];
  photos: ProductPhotoDatoCms[];
  categories: CategoryDatoCms[];
  textDescription: string;
  slugName: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  categories?: Category[];
  shortDescription: string;
  colors: ProductColor[];
  photos: ProductPhoto[];
}
