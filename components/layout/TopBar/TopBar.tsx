import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { Category } from "../../../types/category";
import { Product } from "../../../types/product";
import { getTreeCategories } from "../../../utils/category";
import { getPath } from "../../../utils/routing";
import DesktopTopBar from "./DesktopTopBar";
import MobileTopBar from "./MobileTopBar";

interface Props {
  products: Product[];
  categories: Category[];
}
export default function TopBar({ products, categories }: Props) {
  const router = useRouter();
  const treeCategories = useMemo(
    () => getTreeCategories(categories),
    [categories]
  );
  const goToProduct = useCallback(
    (productName: string) => {
      router.push(getPath("product-detail")(productName));
    },
    [router]
  );

  return (
    <>
      <MobileTopBar
        products={products}
        categories={treeCategories}
        goToProduct={goToProduct}
      />
      <DesktopTopBar
        products={products}
        categories={treeCategories}
        goToProduct={goToProduct}
      />
    </>
  );
}
