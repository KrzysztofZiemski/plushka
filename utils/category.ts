import { Category, CategoryWitchChildren } from "../types/category";

const getChildrens = (
  rootCategory: Category,
  categories: Category[]
): CategoryWitchChildren => {
  const filteredList = categories.filter(
    (el) =>
      el.parent && el.id !== rootCategory.id && el.parent.id === rootCategory.id
  );

  return {
    ...rootCategory,
    childrens: filteredList.map((el) => getChildrens(el, filteredList)),
  };
};

export const getTreeCategories = (categories: Category[]) => {
  const rootCategories = categories.filter(({ parent }) => parent === null);
  const childrensCategories = categories.filter(
    ({ parent }) => parent !== null
  );

  return rootCategories.map((rootCategory) =>
    getChildrens(rootCategory, childrensCategories)
  );
};
