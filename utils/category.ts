import {
  CategoryDatoCms,
  CategoryDatoCmsWitchChildren,
} from "../types/category";

const getChildrens = (
  rootCategory: CategoryDatoCms,
  categories: CategoryDatoCms[]
): CategoryDatoCmsWitchChildren => {
  const filteredList = categories.filter(
    (el) =>
      el.parent && el.id !== rootCategory.id && el.parent.id === rootCategory.id
  );

  return {
    ...rootCategory,
    childrens: filteredList.map((el) => getChildrens(el, filteredList)),
  };
};

export const getTreeCategories = (categories: CategoryDatoCms[]) => {
  const rootCategories = categories.filter(({ parent }) => parent === null);
  const childrensCategories = categories.filter(
    ({ parent }) => parent !== null
  );

  return rootCategories.map((rootCategory) =>
    getChildrens(rootCategory, childrensCategories)
  );
};
