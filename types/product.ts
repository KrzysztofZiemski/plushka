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
  textDescription: string; //w dato
  description: string; //w hygraph
  slugName: string; //w dato
  slug: string; //w hygraph
}
export interface Product {
  id: string;
  name: string;
  description: {
    markdown: string;
  };
  price: number;
  slug: string;
  categories?: Category[];
  shortDescription: string;
  colors: ProductColor[];
  photos: ProductPhoto[];
}
