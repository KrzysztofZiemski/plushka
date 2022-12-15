export interface CategoryDatoCms {
  id: number;
  name: string;
  slugCategory: string;
  parent: CategoryDatoCms | null;
}

export interface CategoryDatoCmsWitchChildren extends CategoryDatoCms {
  childrens: CategoryDatoCms[];
}

export interface Category {
  id: string;
  categoryName: string;
  slug: string;
  categories?: Category[];
  isMainCategory: boolean;
}
