export interface Category {
  id: number;
  name: string;
  slugCategory: string;
  parent: Category | null;
}

export interface CategoryWitchChildren extends Category {
  childrens: Category[];
}
