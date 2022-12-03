export enum Color {
  black = "czarny",
  blue = "niebieski",
  yellow = "żółty",
  white = "biały",
  brown = "brązowy",
  violet = "fioletowy",
  orange = "pomarańczowy",
  green = "zielony",
  pink = "różowy",
}

export interface ProductColor {
  id: string;
  colorsBase: Color;
}
export interface ProductPhoto {
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
  textDescription: string;
}