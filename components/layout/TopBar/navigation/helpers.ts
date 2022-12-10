import { CategoryWitchChildren } from "../../../../types/category";
import { getPath } from "../../../../utils/routing";

export const findInfiniteChildrenIsActive = (
  { slugCategory, childrens }: CategoryWitchChildren,
  path: string
): boolean => {
  return !!(
    getPath("category")(slugCategory) === path ||
    !!childrens.find((el) =>
      findInfiniteChildrenIsActive(el as CategoryWitchChildren, path)
    )
  );
};
