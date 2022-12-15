import { Category } from "../../../../types/category";
import { getPath } from "../../../../utils/routing";

export const findInfiniteChildrenIsActive = (
  { slug, categories }: Category,
  path: string
): boolean => {
  return !!(
    getPath("category")(slug) === path ||
    !!categories?.find((el) =>
      findInfiniteChildrenIsActive(el as Category, path)
    )
  );
};
